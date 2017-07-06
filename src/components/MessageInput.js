import React, {Component} from 'react';

import TextField from 'material-ui/TextField';

export default class ChatInput extends Component {
    handleMessages() {
        const message = this.refs.msgField.input.value

        if(message) {
            const messageObj = {
                uid: this.props.uid,
                username: this.props.username,
                content: message,
                time: this.getTime()
            }

            this.props.socket.emit('updateMessages', messageObj)
            this.refs.msgField.input.value = ''
            this.props.actions.setErrorInfo('')
        }else {
            this.props.actions.setErrorInfo('You don\'t input any messages.')
        }
    }

    handleKeyPress(e) {
        if(e.key === 'Enter') {
            this.handleMessages()
        }
    }

    getTime() {
        const date = new Date()
        let [ hour, minute ] = [ date.getHours(), date.getMinutes() ]
        hour = hour < 10 ? '0' + hour : hour
        minute = minute < 10 ? '0' + minute : minute

        return hour + ':' + minute
    }

    render() {
        return(
            <TextField ref="msgField" style={{ width: '90%', paddingTop: '3vh' }} hintText="Input messsages" errorText={ this.props.errorinfo } onKeyPress={ this.handleKeyPress.bind(this) } />
        )
    }
}