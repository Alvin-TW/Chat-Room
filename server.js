var path = require('path');
var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
var webpack = require('webpack');
var config = require('./configs/webpack.config.dev');
var server =require('http').createServer(app);
var io = require('socket.io')(server);
var compiler = webpack(config);
var mode = process.env.NODE_ENV;

if(mode === 'production') {
	app.use(express.static('dist'));
	app.get('/', function (req, res, next) {
		res.set('content-type','text/html');
	    res.sendFile(path.join(__dirname, './dist/index.html'));
	});
}else {
	app.use(require('webpack-dev-middleware')(compiler, {
	    noInfo: true,
	    publicPath: config.output.publicPath
	}));

	app.use(require('webpack-hot-middleware')(compiler, {
	    path: '/__webpack_hmr',
	    heartbeat: 2000
	}));

	app.get('/', function (req, res, next) {
	    var filename = path.join(compiler.outputPath, 'index.html');
	    compiler.outputFileSystem.readFile(filename, function(err, result) {
	        if(err) {
	            return next(err);
	        }
	        res.set('content-type','text/html');
	        res.send(result);
	        res.end();
	    });
	});
}

var userList = {};

io.on('connection', function(socket) {
    var socketID = socket.id;

    socket.on('enter', function(info) {
        userList[socketID] = info;
        socket.emit('uid', socketID);
        socket.broadcast.emit('enterUser', userList[socketID].username);
        io.emit("updateUserList", userList);
    });

    socket.on('updateMessages', function(messages) {
        io.emit('updateMessages', messages);
    })

    socket.on('leave', function(uid) {
        if(userList.hasOwnProperty(uid)) {
            socket.broadcast.emit('leaveUser', userList[uid].username);
            delete userList[uid];
        }

        socket.broadcast.emit("updateUserList", userList);
        socket.disconnect(true);
    });

    socket.on('disconnect', function() {
        if(userList.hasOwnProperty(socketID)) {
            socket.broadcast.emit('leaveUser', userList[socketID].username);
            delete userList[socketID];
        }

        socket.broadcast.emit("updateUserList", userList);
    });
});

server.listen(port, function(err) {
    console.log('Listening port:' + port);
});
