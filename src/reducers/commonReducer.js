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
            return { ...state, ...action.userinfo }
        case 'SET_USERID':
            return {...state, uid: action.uid }
        case 'UPDATE_USERLIST':
            return {...state, userlist: action.userlist }
        case 'UPDATE_MESSAGE':
            return {...state, messages: [...state.messages, action.messages] }
        case 'CLEAR_MESSAGE':
            return {...state, messages: [] }
        case 'CHANGE_MESSAGEBOXCOLOR':
            return {...state, msgboxcolor: action.color }
        case 'SET_ERRORINFO':
            return {...state, errorinfo: action.error }
        default:
            return state
    }
}