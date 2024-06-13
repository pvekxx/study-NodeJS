// express 외장 모듈
const express = require("express")
// mysql2 외장 모듈
const mysql = require("mysql2")
// path 모듈
const path = require("path")
// 서버 객체 생성
const app = express()

// sql 쿼리 보내는 연결
const sqlConnect = mysql.createConnection({
    user: "root",
    password: "....",
    database: "test",
    multipleStatements: true
})

// views 키값에 페이지 폴더 경로 설정
app.set("views", path.join(__dirname, "page"))
// view engine 키값 ejs로 사용
app.set("view engine", "ejs")

// 미들웨어
// 요청 body의 문자열 내용 객체로 변환
app.use(express.json())
// url 깊은 객체 지원 x
app.use(express.urlencoded({ extended: false }))

// 읽기
app.get("/", (req, res) => {
    res.render("main2")
})

app.get("/listlistlist", (req, res) => {
    const readSql = "SELECT * FROM products"
    sqlConnect.query(readSql, (err, data) => {
        res.render("list2", { data })
    })
})

app.get("/insertinsertinsert", (req, res) => {
    res.render("insert2")
})

// 수정페이지로 요청
app.get("/modifymodifymodify/:id", (req, res) => {
    const modifySql = "SELECT * FROM products WHERE id=?"
    sqlConnect.query(modifySql, [req.params.id], (err, data) => {
        res.render("modify2", { data })
        console.log(req.params);
    })
})

// 수정하기
app.post("/modifymodifymodify/:id", (req, res) => {
    const { inputname, inputnumber } = req.body;
    const confirmSql = "UPDATE products SET name=?, number=? WHERE id=?"
    sqlConnect.query(confirmSql, [inputname, inputnumber, req.params.id], () => {
        res.redirect("/listlistlist");
        console.log(req.params)
    })
})

// 쓰기
app.post("/haha", (req, res) => {
    const { inputname, inputnumber } = req.body;
    const insertSql = "INSERT INTO products (name, number) VALUES (?,?)"
    sqlConnect.query(insertSql, [inputname, inputnumber], () => {
        res.redirect("/listlistlist");
    })
})

// 삭제하기
app.post("/listlistlist/:id", (req, res) => {
    const deleteSql = "DELETE FROM products WHERE id=?"
    sqlConnect.query(deleteSql, [req.params.id], () => {
        res.redirect("/listlistlist")
        console.log(req.params)
    })
})

// 서버 대기상태
app.listen(3000, () => {
    console.log("server on!!!")
})