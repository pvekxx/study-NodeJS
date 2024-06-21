const mysql = require("./config");

// 글 조회
// 글 작성
// 글 수정
// 글 삭제
// 사용하기 편한 메서드 형태로 구성
const posts = {
    initTable: async () => { // async 프로미스를 반환
        try {
            // 테이블이 존재하는지 조회를 하고
            const result = await mysql.query("SELECT * FROM posts");
            console.log(result);
        } catch (error) {
            // 에러가 발생하면
            await mysql.query("CREATE TABLE posts(id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(20), content VARCHAR(100))")
        }
    },

    // 글의 전체 내용을 조회
    getViewPostAll: async () => {
        try {
            // 배열의 구조분해 할당은
            // 배열의 첫번째 내용만 할당 데이터의 부분 -> 0번째를 가져옴 순서대로
            const [result] = await mysql.query("SELECT * FROM posts");
            return result;
        } catch (error) {
            console.log("err : models select post table")
        }
    },

    // 선택 글 조회
    getSelectIndexPost: async (id) => {
        try {
            const [[result]] = await mysql.query("SELECT * FROM posts WHERE id = ?", [id])
            console.log(result);
            return result;
        } catch (error) {
            console.log("err : models select index post table")
        }
    },

    // 글 추가 메서드
    setPostContent: async (title, content) => {
        try {
            await mysql.query("INSERT INTO posts(title, content)VALUES(?,?)", [title, content])
        } catch (error) {
            console.log("err : models INSERT post table")
        }
    }
}

posts.initTable();
// posts.setPostContent("제목1", "컨텐츠1");
posts.getSelectIndexPost(2);
// 모자란 orm을 표현 조금.
// 객체와 데이터베이스 매핑
module.exports = posts;

// module.exports = {posts객체의 내용} 으로 해서