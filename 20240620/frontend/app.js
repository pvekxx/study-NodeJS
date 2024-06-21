// ejs 사용 프론트엔드에 axios도 설치
const express = require("express");
const path = require("path");
const cookie = require("cookie-parser");
const axios = require("axios");

const app = express();
// 미들웨어
app.use(cookie()); // 쿠키 사용
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");
// 라우터
app.get("/", (req, res) => {
    res.render("main")
});

app.get("/login", (req, res) => {
    res.render("login")
});

app.get("/signup", (req, res) => {
    res.render("signup")
});

app.post("/login", async (req, res) => {
    const { inputuid, inputupw } = req.body; // post시 요청객체에서 데이터 받음
    const { data } = await axios.post("http://127.0.0.1:4000/login", { inputuid, inputupw }) // axios로 (주소)로 (데이터)를 보냄 로컬호스트 주소임..
    console.log(data);
    res.send(data); // res.send(`아이디 : ${inputuid}, 비밀번호 : ${inputupw}`) // 페이지로 send
});

app.post("/signup", (req, res) => {
    const { inputuid, inputupw } = req.body; // post시 요청객체에서 데이터 받음
    res.send(`아이디 : ${inputuid}, 비밀번호 : ${inputupw}`)
});

app.listen(3000, () => {
    console.log("front server on!")
});