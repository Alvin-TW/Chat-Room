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

import './App.sass'

import ChatRoom from '@/components/ChatRoom'
import LoginForm from '@/components/LoginForm'

const App = props => (
  <MuiThemeProvider>
    {props.username ? <ChatRoom {...props} /> : <LoginForm {...props} />}
  </MuiThemeProvider>
)

const mapStateToProps = state => ({
  uid: state.commonReducer.uid,
  username: state.commonReducer.username,
  sex: state.commonReducer.sex,
  userlist: state.commonReducer.userlist,
  messages: state.commonReducer.messages,
  msgboxcolor: state.commonReducer.msgboxcolor,
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