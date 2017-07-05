export const setUserInfo = userinfo => {
	return { type: 'SET_USERINFO', userinfo: userinfo }
}

export const setUserId = uid => {
	return { type: 'SET_USERID', uid: uid }
}

export const updateUserList = userlist => {
	return { type: 'UPDATE_USERLIST', userlist: userlist }
}

export const updateMessages = messages => {
	return { type: 'UPDATE_MESSAGE', messages }
}

export const clearMessages = () => {
	return { type: 'CLEAR_MESSAGE' }
}

export const leaveChatRoom = () => {
	return { type: 'LEAVE_CHATROOM' }
}

export const changeMessageBoxColor = color => {
	return { type: 'CHANGE_MESSAGEBOXCOLOR', color: color }
}

export const setErrorInfo = error => {
	return { type: 'SET_ERRORINFO', error: error }
}