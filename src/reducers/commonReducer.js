import io from 'socket.io-client';

const initialState  = {
    uid: '',
    username: '',
    sex: '',
    userlist: {},
    messages: [],
    msgboxcolor: '',
    errorinfo: '',
    socket: io()
}

export default function commonFn(state = initialState, action) {
    switch(action.type) {
        case 'SET_USERINFO':
            return Object.assign({}, state, action.userinfo )
        case 'SET_USERID':
            return Object.assign({}, state, { uid: action.uid })
        case 'UPDATE_USERLIST':
            return Object.assign({}, state, { userlist: action.userlist })
        case 'UPDATE_MESSAGE':
            return Object.assign({}, state, { messages: [...state.messages, action.messages] })
        case 'CLEAR_MESSAGE':
            return Object.assign({}, state, { messages: [] })
        case 'CHANGE_MESSAGEBOXCOLOR':
            return Object.assign({}, state, { msgboxcolor: action.color })
        case 'SET_ERRORINFO':
            return Object.assign({}, state, { errorinfo: action.error })
        default:
            return state
    }
}