const express = require("express");
const path = require("path");
const mysql = require("mysql2");

const app = express();

const mysqlConnect = mysql.createConnection({
    user: "root",
    password: "....",
    database: "test",
    multipleStatements: true
})

app.set("views", path.join(__dirname, "page"))
app.set("view engine", "ejs")

// body의 문자열 내용을 파싱해서 요청 객체에 body 키에 문자열을 파싱해서 객체로 할당해준다.
app.use(express.json()) // 요청 body의 내용 문자열을 객체로 변환하겠다.
app.use(express.urlencoded({ extended: false })); // url 깊은객체를 지원안하겠다.

app.listen(3000, () => {
    console.log("server on!")
})

app.get("/", (req, res) => {
    res.render("main");
})

app.get("/list", (req, res) => {
    mysqlConnect.query("SELECT * FROM products", (err, data) => {
        console.log(data);
        res.render("list", { data })
    });
})

app.get("/list/:name", (req, res) => {
    // name 키값 요청 url에 값이 value로 할당
    // list/1 === {name : 1}
    console.log(req.params);
});


app.get("/insert", (req, res) => {
    res.render("insert")
});

app.post("/insert", (req, res) => {
    const { labelname, inputnumber } = req.body;
    const insertSql = "INSERT INTO products (name, number) VALUES (?,?)"
    mysqlConnect.query(insertSql, [labelname, inputnumber], () => {
        res.redirect('/list');
    });
});