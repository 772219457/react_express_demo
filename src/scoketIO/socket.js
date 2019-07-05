import io from 'socket.io-client'

// 连接服务器,得到与服务器的连接对象
const socket = io('ws://localhost:4000')


// 发送消息
socket.emit('sendMsg', {name: 'abc'})

//绑定监听，接收服务器端发送的消息
socket.on('receiveMsg',(data) => {
    console.log(data)
})
