const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
// cookie-parser
const cookie = require("cookie-parser");
require("dotenv").config();
const app = express();

// process 객체에 env 키에 우리가 작성한 내용이 키와 값으로 할당된다.
console.log(process.env.KEY);
// .env 파일은 올리면 안되고 빌드를 해서 올리거나
// 환경변수 지정하는 페이지에서 값을 적어주면 된다.

app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookie());

function tokenMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.send("유효하지 않은 유저")
    req.user = token;
    next();
}

app.listen(3000, () => {
    console.log("server on!");
})

app.get("/", (req, res) => { // 서버 사이드 렌더링 서버가 웹을 만들어주는것
    res.render("login")
})

const user = { // 유저 데이터
    uid: "soon",
    password: "123"
}

app.get("/board", tokenMiddleware, (req, res) => {
    res.send(`board page ${req.user.name}`);
})

app.post("/login", (req, res) => {
    const { uid: user_id, upw: user_password } = req.body; // :를 붙여서 정한 변수에 따로 담을 수 있음
    if ((user_id == user.uid) && (user_password == user.password)) {
        const { KEY } = process.env;
        // json web token을 발급할때 비밀 키를 넣어서 만들어 줄것.
        // payload 값도 복원하고 검증을 하기 위해선 KEY값이 있어야 한다.
        let token = jwt.sign({ // 페이로드 내용
            // 유저 이름
            name: "soon"
        }, KEY, {
            // 토큰 유지 시간
            expiresIn: "5m",
            // 토큰 발급자
            issuer: "발급자"
        });
        console.log(token); // 헤더내용.페이로드내용.서명내용 의 형태로 나옴
        // verify() 토큰을 검증하고 payload값을 복호화 // true false가 나옴
        const data = jwt.verify(token, KEY);
        console.log(data);
        // 단순 쿠키로 저장을 할것.
        // httponly
        res.cookie("token", data, { httpOnly: true }) // 토큰의 이름, 토큰의 값, 옵션
        res.redirect("/");
    } else {
        res.redirect("/");
    }
})