import io from 'socket.io-client'

// Actions
const SET_USERINFO = 'SET_USERINFO'
const SET_USERID = 'SET_USERID'
const UPDATE_USERLIST = 'UPDATE_USERLIST'
const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
const CLEAR_MESSAGE = 'CLEAR_MESSAGE'
const LEAVE_CHATROOM = 'LEAVE_CHATROOM'
const CHANGE_MESSAGEBOXCOLOR = 'CHANGE_MESSAGEBOXCOLOR'
const SET_ERRORINFO = 'SET_ERRORINFO'

// Action Creators
export const setUserInfo = userinfo => ({ type: SET_USERINFO, userinfo })
export const setUserId = uid => ({ type: SET_USERID, uid })
export const updateUserList = userlist => ({ type: UPDATE_USERLIST, userlist })
export const updateMessages = messages => ({ type: UPDATE_MESSAGE, messages })
export const clearMessages = () => ({ type: CLEAR_MESSAGE })
export const leaveChatRoom = () => ({ type: LEAVE_CHATROOM })
export const changeMessageBoxColor = color => ({ type: CHANGE_MESSAGEBOXCOLOR, color })
export const setErrorInfo = error => ({ type: SET_ERRORINFO, error })

// Reducer
const initialState  = {
  uid: '',
  username: '',
  sex: '',
  userlist: {},
  messages: [],
  messageBackgroundColor: '',
  errorinfo: '',
  socket: io()
}

export default function commonFn(state = initialState, action) {
  switch(action.type) {
    case SET_USERINFO:
      return { ...state, ...action.userinfo }
    case SET_USERID:
      return {...state, uid: action.uid }
    case UPDATE_USERLIST:
      return {...state, userlist: action.userlist }
    case UPDATE_MESSAGE:
      return {...state, messages: [...state.messages, action.messages] }
    case CLEAR_MESSAGE:
      return {...state, messages: [] }
    case CHANGE_MESSAGEBOXCOLOR:
      return {...state, messageBackgroundColor: action.color }
    case SET_ERRORINFO:
      return {...state, errorinfo: action.error }
    default:
      return state
  }
}