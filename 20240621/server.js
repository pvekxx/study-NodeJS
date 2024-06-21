const webSocket = require("ws");

const ws = new webSocket.Server({ port: 3000 });

// connection 클라이언트가 웹소켓에 접속 요청을 했을때
ws.on("connection", (socket) => {
    console.log("클라이언트 연결")
    // 서버 측에서 클라이언트에게 요청을 받고
    // message 라는 이벤트 명이면 콜백함수 호출
    // on : 이벤트에 콜백함수로 등록
    // send : 이벤트 호출
    // console.log(socket);
    // message 기본적으로 있는 이벤트명
    socket.on("message", (msg) => { // 스트림을 받으면 foreach로 전달
        console.log(msg.toString());
        ws.clients.forEach((client) => {
            client.send(msg.toString())
        })
    });

    socket.on("close", () => {
        console.log("클라이언트 연결 종료");
    })

    // ws:localhost:0000
})