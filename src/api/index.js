/**
 *
 * 多个接口的函数模块
 *
 * */

import ajax from './ajax'

// 注册接口
export const reqRegister = (data) => ajax('/register',data,'POST')

// 登录接口
export const reqLogin = (data) => ajax('/login',data,'POST')

// 完善信息接口
export const reqInfoUpdate = (data) => ajax('/infoUpdate',data,'POST')

// 获取用户信息
export const reqUserInfo = () => ajax('/user',{},'GET')

// 获取用户列表
export const reqUserList = (userType) => ajax('/userList',{userType},'GET')

// 获取消息列表
export const reqMsgList = () => ajax('/msgList',{},'GET')

// 更改消息状态
export const reqReadMsg = (data) => ajax('/readMsg',{data},'POST')
