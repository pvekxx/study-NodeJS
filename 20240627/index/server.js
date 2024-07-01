const fs = require("fs");
// 랜덤한 이름이나 랜덤한 이메일이나 등등
// npm init -y
// npm i @faker-js/faker
const { faker } = require("@faker-js/faker");

// CSV 파일 스트림
const file = fs.createWriteStream("student.csv");

// 테이블의 컬럼 내용
file.write("id,name,email,age,class\n"); // \n 줄바꿈

const classArr = ["devops", "game", "story"];
// 몇만개의 열을 만들자
for (let i = 0; i < 100000; i++) {
    const id = i + 1;
    const name = faker.internet.userName();
    const email = faker.internet.email();
    const age = Math.floor(Math.random() * 100) + 1; // 1살부터 100살 사이
    const className = classArr[Math.floor(Math.random() * 3)];
    file.write(`${id},${name},${email},${age},${className}\n`);
}
// 파일 스트림 끝내고 파일 생성
file.end();
console.log("파일생성");