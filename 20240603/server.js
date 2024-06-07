const net = require('net')

const server = net.createServer(() => { })

server.on('connection', (client) => {
    client.setEncoding('utf8')
    console.log('클라이언트가 접속했다!')
    console.log(client)

    client.on('data', (chunk) => {
        console.log(chunk)
    })
})

server.listen(3000, () => {
    console.log('서버 대기상태다!')
})