import React, { useEffect } from 'react'

import RaisedButton  from "material-ui/RaisedButton"
import Subheader from 'material-ui/Subheader'

import { CirclePicker } from 'react-color'

import Messages from '../components/Messages'
import MessageInput from '../components/MessageInput'
import UserList from '../components/UserList'

const ChatRoom = props => {
    useEffect(() => {
        const socket = props.socket

        socket.on('enterUser', username => {
            props.actions.updateMessages({
                type: 'ENTER_MESSAGE',
                username
            })
        })

        socket.on('leaveUser', username => {
            props.actions.updateMessages({
                type: 'LEAVE_MESSAGE',
                username
            })
        })

        socket.on('updateUserList', userlist => {
            props.actions.updateUserList(userlist)
        })

        socket.on('updateMessages', messages => {
            props.actions.updateMessages(messages)
        })
    }, [])

    const handleChangeComplete = color => {
        props.actions.changeMessageBoxColor(color.hex)
    }

    const handleLeaveChatRoom = () => {
        props.socket.emit('leave', props.uid)
        props.actions.leaveChatRoom()
        location.reload()
    }

    const handleClearMessages = () => {
        props.actions.clearMessages()
    }

    return(
        <div>
            <div className="chatroom-container">
                <div className="chatroom-left-block">
                    <div className="chatroom-userlist">
                        <UserList userlist={props.userlist} />
                    </div>
                </div>
                <div className="chatroom-right-block">
                    <div className="chatroom-otherfn">
                        <RaisedButton
                            className="chatroom-otherfn-leave"
                            label="Leave Room"
                            primary={true}
                            onClick={handleLeaveChatRoom}
                        />
                        <RaisedButton
                            className="chatroom-otherfn-clear"
                            label="Clear"
                            primary={true}
                            onClick={handleClearMessages}
                        />
                    </div>
                    <div className="chatroom-messages">
                        <Messages {...props} />
                    </div>
                </div>
            </div>
            <div className="chatroom-footer">
                <div className="chatroom-left-block">
                        <div className="chatroom-message-color">
                        <Subheader style={{lineHeight: '28px'}}>
                            {'Change Color'}
                        </Subheader>
                            <CirclePicker onChangeComplete={handleChangeComplete} />
                    </div>
                </div>
                <div className="chatroom-right-block">
                    <div className="chatroom-message-input">
                        <MessageInput {...props} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatRoom