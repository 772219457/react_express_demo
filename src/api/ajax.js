/**
 * 使用 axios 封装的 ajax 请求函数 函数返回的是 promise 对象
 * */

import axios from 'axios'

export default function ajax(url, data={}, type='GET') {
    if(type === 'GET') { //GET请求
        let paramStr = ''
        Object.keys(data).forEach(key => {
            paramStr += `${key}=${data[key]}&`
        })
        if(paramStr) {
            paramStr = paramStr.substring(0,paramStr.length-1)
        }
        let httpUrl = `${url}?${paramStr}`
        return axios.get(httpUrl)
    } else {
        // 发送 post 请求
        return axios.post(url, data) // data: 包含请求体数据的对象
    }
}
