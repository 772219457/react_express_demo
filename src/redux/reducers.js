/**
 * 包含多个reducer函数：根据旧的state和指定的action返回一个新的state
 * reducer函数不能是异步函数
 * */
import {combineReducers} from "redux";
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,RESET_USER_List,RECEIVE_USER_List,RECEIVE_MSG,RECEIVE_MSG_List} from './action_types'
import {getRedirectTo} from '../utils'

const initUser = { // 初始的user信息
    username: '',
    userType: '',
    msg: '', //错误提升信息
    redirectTo: '' //重定向路由
}
const initUserList = [] // 初始的userList信息
const initChat = { // 初始的聊天消息
    users: {},
    chatMsgs: [],
    unReadCount: 0
}
// 产生user状态的reducer
function user(state = initUser,action) {
    switch (action.type) {
        case AUTH_SUCCESS: // data 是 user
            const {userType,headImg} = action.data // 解构对象
            return {...action.data,redirectTo: getRedirectTo(userType,headImg)}
        case ERROR_MSG: // data 是 msg
            return {...state, msg: action.data}
        case RECEIVE_USER: // data 是 msg
            return action.data
        case RESET_USER: // data 是 msg
            return {...initUser, msg: action.data}
        default:
            return state
    }
}

function userList(state = initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_List: // data 是 msg
            return action.data
        case RESET_USER_List: // data 是 msg
            return {initUserList, msg: action.data}
        default:
            return state
    }
}

function chatMsgs(state = initChat, action) {
    switch (action.type) {
        case RECEIVE_MSG_List:
            const {chatMsgs, users} = action.data
            return {chatMsgs, users, unReadCount: 0}
        case RECEIVE_MSG: // 返回一条消息
            const chatMsg = action.data
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg]
            }
        default:
            return state
    }
}

export default combineReducers({
    user,
    userList,
    chatMsgs
})
// 导出的状态的结构：{user: {}}
