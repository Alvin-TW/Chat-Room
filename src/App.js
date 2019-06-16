import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {
  setUserInfo,
  setUserId,
  updateUserList,
  updateMessages,
  clearMessages,
  leaveChatRoom,
  changeMessageBoxColor,
  setErrorInfo
} from '@/redux/modules/common'

import ChatRoom from '@/containers/ChatRoom'
import LoginPage from '@/containers/LoginPage'

import '@/App.sass'

const App = props => (
  <MuiThemeProvider>
    {props.username ? <ChatRoom {...props} /> : <LoginPage {...props} />}
  </MuiThemeProvider>
)

const mapStateToProps = state => ({
  uid: state.commonReducer.uid,
  username: state.commonReducer.username,
  sex: state.commonReducer.sex,
  userlist: state.commonReducer.userlist,
  messages: state.commonReducer.messages,
  messageBackgroundColor: state.commonReducer.messageBackgroundColor,
  errorinfo: state.commonReducer.errorinfo,
  socket: state.commonReducer.socket
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setUserInfo,
    setUserId,
    updateUserList,
    updateMessages,
    clearMessages,
    leaveChatRoom,
    changeMessageBoxColor,
    setErrorInfo
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)