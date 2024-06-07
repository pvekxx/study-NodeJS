// nodejs의 stream 내장 모듈

// Transform 스트림 데이터를 읽고 데이터를 변환한뒤 다른 스트림으로 전달하는데 사용
const { Transform } = require("stream");
// stream{Tranform,A,B} 중 `Transform`키값을 구조분해할당해서 가져옴
// const a = require("stream") 로 가져와서 a.Transform으로 사용하는것과 같다.

// nodejs의 내장 모듈 (파일을 읽거나 쓰거나 삭제하거나 할때 사용한다)
// 파일 시스템 의 약자
const fs = require("fs");

// 청크의 크기
// 스트림에서 작업할 때 데이터를 받고 처리할때마다 각 청크를 조작한다.

const chunkSize = 64 * 1024; // 64KB

const transformData = new Transform({
    highWaterMark: chunkSize,
    // transform -> 청크를 변환한다.
    transform(chunk, en, callback) {
        // 받아온 청크를 문자열로 변환 대문자로 변경해서 스트림 전달.
        this.push(chunk.toString().toUpperCase());
        // 변환이 완료되면 콜백 호출
        callback();
    }
})

// 스트림으로 파일의 데이터를 읽어보자
// 스트림 데이터를 읽어온다 매개변수로 파일의 경로
// hightWaterMark : 청크의 크기를 설정해서 읽는 스트림을 만든다.
const test = fs.createReadStream("test.txt", { highWaterMark: chunkSize });
console.log(test);

// 파일 쓰기 스트림 생성 test2.txt에 작성할 스트림
const test2 = fs.createWriteStream("test2.txt");

// 스트림으로 내용을 파일에서 파일로 이동
// pipe : 메서드를 호출한 객체의 내용을 매개변수로 전달한 스트림 객체에 내용을 이동시킨다.
test.pipe(transformData).pipe(test2);