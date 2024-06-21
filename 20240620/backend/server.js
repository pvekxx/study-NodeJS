const express = require("express");
const app = express();
const cors = require("cors"); // 백엔드에 cors설치

app.use(cors({
    origin: "http://127.0.0.1:5500", // 프론트엔드서버 주소
    methods: ["PUT", "DELETE"], // GET, POST 는 기본
    credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/login", (req, res) => {
    const { inputuid, inputupw } = req.body;
    console.log(inputuid, inputupw);
    res.send(`아이디 ${inputuid}, 비밀번호 : ${inputupw}`)
})

app.post("/signup", (req, res) => {
    const { inputuid, inputupw } = req.body;
    res.send(`아이디 ${inputuid}, 비밀번호 : ${inputupw}`)
})

app.listen(4000, () => {
    console.log("back server on!")
})