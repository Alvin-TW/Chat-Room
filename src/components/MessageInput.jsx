import React from 'react'

import TextField from 'material-ui/TextField'

const ChatInput = props => {
    let msgField

    const handleMessages = () => {
        const message = msgField.input.value

        if (message) {
            props.socket.emit('updateMessages', {
                uid: props.uid,
                username: props.username,
                content: message,
                time: getTime()
            })
            msgField.input.value = ''
            props.actions.setErrorInfo('')
        } else {
            props.actions.setErrorInfo('You don\'t input any messages.')
        }
    }

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            handleMessages()
        }
    }

    const getTime = () => {
        const date = new Date()
        let [hour, minute] = [date.getHours(), date.getMinutes()]
        hour = hour < 10 ? '0' + hour : hour
        minute = minute < 10 ? '0' + minute : minute

        return hour + ':' + minute
    }

    return (
        <TextField
            ref={el => msgField = el}
            style = {{ width: '90%', paddingTop: '3vh' }}
            hintText = "Input messsages"
            errorText = {props.errorinfo}
            onKeyPress = {handleKeyPress}
        />
    )
}

export default ChatInput