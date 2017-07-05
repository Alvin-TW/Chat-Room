import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import { bindActionCreators } from 'redux';

import ChatRoom from '../components/ChatRoom';
import LoginForm from '../components/LoginForm';

class App extends Component {
    render() {
        const renderDom = this.props.username ? <ChatRoom { ...this.props } /> : <LoginForm { ...this.props } />
        return (
            <MuiThemeProvider>
                { renderDom }
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = state => {
    return {
        uid: state.commonReducer.uid,
        username: state.commonReducer.username,
        sex: state.commonReducer.sex,
        userlist: state.commonReducer.userlist,
        messages: state.commonReducer.messages,
        msgboxcolor: state.commonReducer.msgboxcolor,
        errorinfo: state.commonReducer.errorinfo,
        socket: state.commonReducer.socket
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)