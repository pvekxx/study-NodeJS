// npm i express socket.io
// 채팅방
// 버스 좌석 예약

const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const app = express();

const server = app.listen(3333, () => {
    console.log("server on!")
})


app.set("views", path.join(__dirname, "page"))
app.set("view engine", "ejs");

// console.log(server);
app.get("/", (req, res) => {
    res.render("main");
})

app.get("/chating", (req, res) => {
    res.render("main2")
})

// web socket 프로토콜 객체 생성
const io = socketio(server); // socketio메서드로 변수에 담은 서버를 전달해서 socket 프로토콜을 연다 , 서버객체안에 핸들러함수, 미들웨어가 생긴다(정적파일들 반환하는)
let users = [];
io.on("connection", (socket) => {
    // console.log(socket); // socket객체의 내용
    users.push(socket.id);
    console.log(users);
    console.log("클라이언트 접속");

    // 서버측 websocket 이벤트명이 같은지 확인하고 핸들러 함수를 호출한다.
    socket.on("serverWhisper", ({ id, msg }) => {
        // to 클라이언트 중에서 누구에게 보낼 이벤트인지 누구인지
        io.sockets.to(id).emit("whisper", msg) // 아이디에 맞는 사람에게 emit으로 메세지의 내용을 준다
    })

    socket.on("joinRoom", (room, name) => {
        // id처럼 고유 해시값을 받게된다.
        // 나만 표현하는 내 id와 다르게 해당 방의 고유 해시값
        // socket room 해시값
        socket.join(room);
        // 어느방에 접속했는지 그 방에 있는 사람들에게 브로드 캐스팅
        io.to(room).emit("joinRoom", room, name); // 매개변수의 순서
    })

    socket.on("leaveRoom", (room, name) => {
        socket.leave(room); // room의 값을 제거
        io.to(room).emit("leaveRoom", room, name);
    })

    socket.on("chat", (room, name, msg) => {
        io.to(room).emit("chat", name, msg);
    })

    socket.on("disconnect", () => {
        users = users.filter((value) => value != socket.id); // id값이 밸류랑 같지 않을때 users에 새로 반환
        console.log(users)
    })
});