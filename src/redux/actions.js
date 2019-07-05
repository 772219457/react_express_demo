/**
 * 包含多个action creator
 * 异步action
 * 同步action
 * */

import {reqRegister, reqLogin, reqInfoUpdate, reqUserInfo, reqUserList, reqMsgList, reqReadMsg} from '../api'
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_List, RESET_USER_List, RECEIVE_MSG, RECEIVE_MSG_List} from './action_types'
import io from 'socket.io-client'

// 授权成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})

// 错误提示的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})

// 接收用户的同步action
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})

// 重置用户的同步action
export const resetUser = (msg) => ({type: RESET_USER, data: msg})

// 接收用户列表的同步action
const receiveUserList = (userList) => ({type: RECEIVE_USER_List, data: userList})

// 重置用户列表的同步action
const resetUserList = (msg) => ({type: RESET_USER_List, data: msg})

// 接收消息列表的同步action
const receiveMsgList = (data) => ({type: RECEIVE_MSG_List, data: data})

// 接收消息的同步action
const receiveMsg = (chatMsg) => ({type: RECEIVE_MSG, data: chatMsg})

function initIO(dispatch,userId) {
    // 创建单例对象，判断是否存在
    if (!io.socket) {
        // 存入对象
        io.socket = io('ws://localhost:4000')
        io.socket.on('receiveMsg', (chatMsg) => {
            // 规避消息
            if(userId === chatMsg.from || userId === chatMsg.to) {
                dispatch(receiveMsg(chatMsg))
            }
        })
    }

}

// 发送消息
export const sendMsg = ({from,to,content}) => {
    return dispatch => { // 发送消息异步ajax请求
        io.socket.emit('sendMsg',{from,to,content})
    }
}

// 获取消息函数
async function getMsgList(dispatch,userId) {
    initIO(dispatch,userId)
    const responed = await reqMsgList()
    //     if (res.data.code === 0) {
    //         const {chatMsgs, users} = res.data.data
    //         dispatch(receiveMsgList({chatMsgs, users}))
    //     }
    // })
    if(responed.data.code === 0) {
        const {chatMsgs, users} = responed.data.data
        dispatch(receiveMsgList({chatMsgs, users}))
    }
}


// 注册异步action
export const register = (user) => {
    const {username, password, checkPassword, userType} = user

    //  表单的前台验证
    if (!username) {
        return errorMsg('请输入用户名！')
    } else if (!password) {
        return errorMsg('请输入密码！')
    } else if (!checkPassword) {
        return errorMsg('请再次输入密码！')
    } else if (password !== checkPassword) {
        return errorMsg('两次密码不一致！')
    }

    return dispatch => { // 发生注册异步ajax请求
        reqRegister({username, password, userType}).then(result => {
            if (result.data.code === 0) { // 成功
                getMsgList(dispatch,result.data.data._id)
                // 分发授权成功的action
                dispatch(authSuccess(result.data.data))
            } else {
                // 分发错误提示的action
                dispatch(errorMsg(result.data.msg || '网络错误'))
            }
        }).catch(err => {
            dispatch(errorMsg('网络错误'))
        })
    }
}

// 登录异步action
export const login = (user) => {

    //  表单的前台验证
    if (!user.username) {
        return errorMsg('请输入用户名！')
    } else if (!user.password) {
        return errorMsg('请输入密码！')
    }

    return dispatch => { // 发生注册异步ajax请求
        // const result = await reqLogin(user)
        // if(result.code === 0) { // 成功
        //     // 分发授权成功的action
        //     dispatch(authSuccess(result.data))
        // } else {
        //     // 分发错误提示的action
        //     dispatch(errorMsg(result.msg))
        // }
        reqLogin(user).then(result => {
            if (result.data.code === 0) { // 成功
                // 分发授权成功的action
                getMsgList(dispatch,result.data.data._id)
                dispatch(authSuccess(result.data.data))
            } else {
                // 分发错误提示的action
                dispatch(errorMsg(result.data.msg || '网络错误'))
            }
        }).catch(err => {
            dispatch(errorMsg('网络错误'))
        })
    }
}

// 信息完善异步action
export const infoUpdate = (user) => {
    return dispatch => { // 发生注册异步ajax请求
        reqInfoUpdate(user).then(result => {
            if (result.data.code === 0) { // 成功
                // 分发授权成功的action
                dispatch(receiveUser(result.data.data))
            } else {
                // 分发错误提示的action
                dispatch(resetUser(result.data.msg || '网络错误1'))
            }
        }).catch(err => {
            dispatch(resetUser('网络错误'))
        })
    }
}

// 获取用户信息异步action
export const userInfo = () => {
    return dispatch => { // 发生注册异步ajax请求
        reqUserInfo().then(result => {
            if (result.data.code === 0) { // 成功
                // 分发授权成功的action
                dispatch(receiveUser(result.data.data))
            } else {
                // 分发错误提示的action
                dispatch(resetUser(result.data.msg || '网络错误1'))
            }
        }).catch(err => {
            dispatch(resetUser('网络错误'))
        })
    }
}

// 获取用户列表
export const getUserList = (userType, userId) => {
    return dispatch => { // 发生注册异步ajax请求
        reqUserList(userType).then(result => {
            if (result.data.code === 0) { // 成功
                getMsgList(dispatch,userId)
                // 分发授权成功的action
                dispatch(receiveUserList(result.data.data))
            } else {
                // 分发错误提示的action
                dispatch(resetUserList(result.data.msg || '网络错误1'))
            }
        }).catch(err => {
            dispatch(resetUserList('网络错误'))
        })
    }
}

