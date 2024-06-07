const net = require('net')

const socket = net.connect({
    port: 3000,
    host: 'localhost'
})

socket.on('connect', () => {
    console.log('CLIENT : 나 연결 되었어!')
    socket.write('hellow world!')
})