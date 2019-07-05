/**
 * 包含多个工具函数
 * */

export function getRedirectTo(userType,headImg) {
    let path
    if (userType === 'boss') {
        path = '/boss'
    } else {
        path = '/lower'
    }

    if(!headImg) {
        path = path + 'Info'
    }
    return path
}
