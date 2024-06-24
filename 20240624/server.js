// 예약 페이지 만들어보기

const express = require("express");
const path = require("path");
const socket = require("socket.io")
const app = express();

app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");
// express.static 핸들러 함수
app.use(express.static(path.join(__dirname, "public"))); // 정적 파일 가져올수있게 미들웨어로 라우팅 처리 ex)css
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = app.listen(3000, () => {
    console.log("server on!")
})

// 빈 좌석은 1
// 좌석의 여백은 0
// 예약된 좌석 2
let seat01 = [
    [1, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 1]
];
let seat02 = [
    [1, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 1]
];
let seat03 = [
    [1, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 1]
];

let seats = [seat01, seat02, seat03]

app.get("/seats/:id", (req, res) => {
    const { id } = req.params;
    // 어떤 버스의 좌석에 앉을건지.
    console.log(id);
    res.send(seats[id]);
})

app.get("/", (req, res) => {
    res.render("main")
})

// socket io 스크립트 라우팅
// /socket.io/socket.io.js
const io = socket(server); // socket메서드에 서버객체를 넣어서 반환, 웹소켓 포트 생성

io.sockets.on("connection", (socket) => {
    // 클라이언트가 접속
    console.log("클라이언트 접속");
    socket.on("reserve", (data) => {
        console.log("예약 됐어")
        // data.selectIndex.x
        // data.selectIndex.y
        const { selectIndex: { x, y }, index } = data;
        const selectSeats = seats[index];
        selectSeats[y][x] = 2
        io.sockets.emit("reRender", data);
    })
})