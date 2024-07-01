// 데이터베이스 사용자 설정 객체
const config = {
    // 개발 용도
    dev: {
        username: "root",
        password: "....",
        database: "test5",
        host: "127.0.0.1",
        // dialect 사용할 데이터베이스의 종류를 작성
        dialect: "mysql"
    }
}

module.exports = config;