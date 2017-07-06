import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import RaisedButton  from "material-ui/RaisedButton";
import TextField from 'material-ui/TextField';

export default class LoginForm extends Component {
    handleLogin() {
        const [ username, sex ] = [ this.refs.usernameField.input.value, this.refs.sexField.state.selected ]
        const socket = this.props.socket
        const that = this

        if(username) {
            socket.on('uid', function(uid) {
                that.props.actions.setUserId(uid)
            })

            const userObj = { username: username, sex: sex }

            socket.emit('enter', userObj)
            this.props.actions.setUserInfo(userObj)
            this.props.actions.setErrorInfo('')
        }else {
            this.props.actions.setErrorInfo('user name should be filled in.')
        }
    }

    handleKeyPress(e) {
        if(e.key === 'Enter') {
            this.handleLogin()
        }
    }

    render() {
        return (
            <div className="login-container">
                <div className="login-form">
                    <AppBar showMenuIconButton={ false } title="Chat Room" />
                    <div className="login-form-field">
                        <TextField hintText="Input your name" errorText={ this.props.errorinfo } ref="usernameField" onKeyPress={ this.handleKeyPress.bind(this) } />
                        <RadioButtonGroup name="sex" defaultSelected="boy" ref="sexField" style={{ 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center' }} >
                            <RadioButton value="boy" label="Boy" style={{ width: 'auto' }} />
                            <RadioButton value="girl" label="Girl" style={{ width: 'auto' }} />
                        </RadioButtonGroup>
                    </div>
                    <RaisedButton label="Enter" primary={ true } onClick={ this.handleLogin.bind(this) } />
                </div>
            </div>
        )
    }
}