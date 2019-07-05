const {ChatModel} = require('../db/models')

module.exports = function (server) {
    const io = require('socket.io')(server)

    // 监视客服端与服务器端的连接
    io.on('connection',(socket) => {
        socket.on('sendMsg', ({from,to,content}) => {
            // 处理数据（保存消息）
            // 准备chatMsg对象
            const chat_id = [from,to].sort().join('_')
            const create_time = Date.now()
            new ChatModel({from,to,content,chat_id,create_time}).save((err,chatMsg) => {
                io.emit('receiveMsg',chatMsg)
            })
        })
    })
}
