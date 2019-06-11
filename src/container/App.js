import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/actionCreators'
import { bindActionCreators } from 'redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import ChatRoom from '../components/ChatRoom'
import LoginForm from '../components/LoginForm'

const App = props => (
    <MuiThemeProvider>
        {props.username ? <ChatRoom {...props} /> : <LoginForm { ...props } />}
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
    actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)