import React from 'react';

import AppBar from 'material-ui/AppBar';
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import RaisedButton  from "material-ui/RaisedButton";
import TextField from 'material-ui/TextField';

const LoginForm = props => {
    let usernameField, sexField

    const handleLogin = () => {
        const [username, sex] = [usernameField.input.value, sexField.state.selected]
        const socket = props.socket

        if(username) {
            socket.on('uid', uid => props.actions.setUserId(uid))

            const userObj = {username, sex}

            socket.emit('enter', userObj)
            props.actions.setUserInfo(userObj)
            props.actions.setErrorInfo('')
        }else {
            props.actions.setErrorInfo('user name should be filled in.')
        }
    }

    const handleKeyPress = e => {
        if(e.key === 'Enter') {
            handleLogin()
        }
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <AppBar showMenuIconButton={false} title="Chat Room" />
                <div className="login-form-field">
                    <TextField 
                        hintText="Input your name"
                        errorText={props.errorinfo}
                        ref={el => usernameField = el}
                        onKeyPress={handleKeyPress}
                    />
                    <RadioButtonGroup
                        name="sex"
                        defaultSelected="boy"
                        ref={el => sexField = el}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                        <RadioButton value="boy" label="Boy" style={{ width: 'auto' }} />
                        <RadioButton value="girl" label="Girl" style={{ width: 'auto' }} />
                    </RadioButtonGroup>
                </div>
                <RaisedButton label="Enter" primary={true} onClick={handleLogin} />
            </div>
        </div>
    )
}

export default LoginForm