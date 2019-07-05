module.exports = function (server) {
    const io = require('scoket.io')(server)

    // 监视客服端与服务器端的连接
    io.on('connection',(scoket) => {

    })
}
