import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

const MessageDisplayBox = ({ messages, messageBackgroundColor, uid }) => {
  const messageElement = []
  let messageEndLine

  useEffect(() => {
    ReactDOM.findDOMNode(messageEndLine).scrollIntoView()
  })

  for (let [index, message] of messages.entries()) {
    let systemMsg = ''

    if (message.hasOwnProperty('type')) {
      switch (message.type) {
        case 'ENTER_MESSAGE': systemMsg = 'is coming in the room.'
          break
        case 'LEAVE_MESSAGE': systemMsg = 'is leaving out of the room.'
          break
      }

      messageElement.push(
        <div key={index} className="message system-message">
          {`${message.username} ${systemMsg}`}
        </div>
      )
    } else {
        if (message.uid === uid) {
          messageElement.push(
            <div key={index} className="message message-right">
              <div className="message-time"> {message.time} </div>
              <div className="message-content" style={{ backgroundColor: messageBackgroundColor }}>
                {message.content}
              </div>
            </div>
          )
        } else {
          messageElement.push(
            <div key={index} className="message message-left">
              <div className="message-user"> {`${message.username}:`} </div>
              <div className="message-content" style={{ backgroundColor: messageBackgroundColor }}>
                {message.content}
              </div>
              <div className="message-time"> {message.time} </div>
            </div>
          )
        }
    }
  }

  return (
    <div>
      <div>
        {messageElement}
      </div>
      <div className="message" ref={el => messageEndLine = el} />
    </div>
  )
}

export default MessageDisplayBox