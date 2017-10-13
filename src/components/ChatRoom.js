import React, { Component } from 'react';

import RaisedButton  from "material-ui/RaisedButton";
import Subheader from 'material-ui/Subheader';

import { CirclePicker } from 'react-color';

import Messages from '../components/Messages';
import MessageInput from '../components/MessageInput';
import UserList from '../components/UserList';

export default class ChatRoom extends Component {
    componentDidMount() {
        const socket = this.props.socket

        socket.on('enterUser', username => {
            this.props.actions.updateMessages({ type: 'ENTER_MESSAGE', username: username })
        })

        socket.on('leaveUser', username => {
            this.props.actions.updateMessages({ type: 'LEAVE_MESSAGE', username: username })
        })

        socket.on('updateUserList', userlist => {
            this.props.actions.updateUserList(userlist)
        })

        socket.on('updateMessages', messages => {
            this.props.actions.updateMessages(messages)
        })
    }

    handleChangeComplete = color => {
        this.props.actions.changeMessageBoxColor(color.hex)
    }

    handleLeaveChatRoom() {
        this.props.socket.emit('leave', this.props.uid)
        this.props.actions.leaveChatRoom()
        location.reload()
    }

    handleClearMessages() {
        this.props.actions.clearMessages()
    }

    render() {
        return(
            <div>
                <div className="chatroom-container">
                    <div className="chatroom-left-block">
                        <div className="chatroom-userlist">
                            <UserList userlist={ this.props.userlist } />
                        </div>
                    </div>
                    <div className="chatroom-right-block">
                        <div className="chatroom-otherfn">
                            <RaisedButton className="chatroom-otherfn-leave" label="Leave Room" primary={ true } onClick={ this.handleLeaveChatRoom.bind(this) } />
                            <RaisedButton className="chatroom-otherfn-clear" label="Clear" primary={ true } onClick={ this.handleClearMessages.bind(this) } />
                        </div>
                        <div className="chatroom-messages">
                            <Messages { ...this.props } />
                        </div>
                    </div>
                </div>
                <div className="chatroom-footer">
                    <div className="chatroom-left-block">
                         <div className="chatroom-message-color">
                            <Subheader style={{'lineHeight': '28px'}}>
                                { `Change Color` }
                            </Subheader>
                             <CirclePicker onChangeComplete={ this.handleChangeComplete.bind(this) } />
                        </div>
                    </div>
                    <div className="chatroom-right-block">
                        <div className="chatroom-message-input">
                            <MessageInput { ...this.props } />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}