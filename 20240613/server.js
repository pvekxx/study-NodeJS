// mysql 연결
// 외부 모듈을 설치해서 사용할것
// 설치하는 모듈은 mysql 자체가 아니다 드라이버라고 생각하면 된다.

// mysql 모듈 설치
// mysql mysql2

// mysql 콜백방식
// mysql2 promise 기반으로 사용 비동기적으로 !
// mysql2 공식문서에서도 권장하는 모듈

// npm init -y
// npm i mysql2

const mysql = require("mysql2");
// mysql2 connect를 맺을수 있는 메서드
// 유저 이름
// 유저 비밀번호
// database
// host : 127.0.0.1 (기본값)
// port : 3306 (기본값)

// createConnection : 연결 요청을 보냄 반환받은 객체를 통해 쿼리문을 요청할수 있는 메서드를 제공
const mysqlConnect = mysql.createConnection({
    user: "root",
    password: "....", // 내 비밀번호 입력
    database: "test", // 사용할 데이터베이스 이름
    multipleStatements: true
})
// multipleStatements -> 다중 쿼리를 실행할수 있게 설정하는 옵션

// mysqlConnect -> 객체를 반환받는데 쿼리 작업을 할수 있는 메서드가 포함되어 있다.

// query 메서드 : 쿼리문을 매개변수로 전달하면 실행결과를 받을 수 있다.
// 테이블 생성

mysqlConnect.query("SELECT * FROM products", (err, res) => {
    if (err) {
        console.log("테이블이 없어~")
        const sql = "CREATE TABLE products(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(10), number INT)";
        mysqlConnect.query(sql);
        console.log("테이블이 없어서 만들었어~");
    } else {
        console.log("테이블이 있어~");
    }
})

// 글 추가
// const createSql = "INSERT INTO products (name, number) VALUES (?,?)"
// mysqlConnect.query(createSql, ["soon2", "123"], (err) => {
//     if (err)
//         console.log(err);
//     console.log("글이 추가됐어")
// })



// 글 삭제
// const deleteSql = "DELETE FROM products WHERE id = ?;";
// const deleteSql2 = "SET @CNT = 0; UPDATE products SET products.id = @CNT:=@CNT+1;";
// const deleteSql3 = "ALTER TABLE products AUTO_INCREMENT = 0;";
// const deleteSqlAll = deleteSql + deleteSql2 + deleteSql3
// mysqlConnect.query(deleteSqlAll, [1], (err) => {
//     if (err)
//         console.log("삭제할 로우를 못찾았어");
//     console.log("정상적으로 삭제됨~")
// })
// SET -> @CNT를 초기화 0으로 할당.
// @CNT:@CNT+1 -> 연산을 하고 products.id 순서대로 할당 1 2 3 4 5

// 글 수정
const updateSql = "UPDATE products SET name = ?, number = ? WHERE id = ?";
mysqlConnect.query(updateSql, ["soon123", 456234, 1], (err) => {
    if (err) {
        console.log(err)
        console.log("수정이 잘 됐어~")
    }
})

// 글 조회
mysqlConnect.query("SELECT * FROM products", (err, res) => {
    console.log(res);
})