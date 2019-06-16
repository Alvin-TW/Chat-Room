import React from 'react'

import TextField from 'material-ui/TextField'

const MessageInputBox = ({ actions, errorinfo, socket, uid, username }) => {
  let msgField

  const handleMessages = () => {
    const content = msgField.input.value

    if (content) {
      socket.emit('updateMessages', {
        uid,
        username,
        content,
        time: getTime()
      })
      msgField.input.value = ''
      actions.setErrorInfo('')
    } else {
      actions.setErrorInfo('You don\'t input any messages.')
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
      style={{ width: '90%', paddingTop: '3vh' }}
      hintText="Input messsages"
      errorText={errorinfo}
      onKeyPress={handleKeyPress}
    />
  )
}

export default MessageInputBox
