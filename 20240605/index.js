const fs = require('fs');

// 파일을 읽거나 쓰거나 삭제 생성 등을 할때 사용하는 내장 모듈 파일 시스템
// 폴더가 있는지 확인
// existsSync : 폴더가 있는지 확인 반환값이 true false
let folder = fs.existsSync("./Test");
console.log(folder);
// Sync -> 동기적으로 처리, 기다려주겠다.

// 폴더가 없으면 생성
if (!folder) {
    // 비동기적으로 실행되는 메서드
    // 매개변수로 폴더를 만들 경로를 전달
    // fs.mkdir("./Test", (err) => {
    //     if (err) {
    //         console.log(err)
    //         console.log("에러 발생")
    //     } else (
    //         // 폴더가 생성되고 처리해야할 내용
    //         console.log("Test 폴더가 정상적으로 만들어짐")
    //     )
    // })

    // 페이지의 게시판을 만드는 내용
    // 나머지 기능적인 부분이나 페이지를 그리는 내용은

    const test = fs.mkdirSync("./Test") // test로 반환된 값
    // 폴더에 파일을 만드는 내용 (나 폴더 필요한데? 폴더가 없네?)
    //
    // try catch로 에러
    console.log(test);
    console.log("동기니?")
}

// 폴더 만들었으니 폴더에 파일을 추가해보자
// writeFile : 파일을 쓰기 파일에 데이터를 포함하여 파일을 만들어준다.
// writeFile("파일 생성 경로 및 파일 이름", "파일에 작성할 내용", "함수")
// fs.writeFile("./Test/text.txt", "Hello nodejs", (err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log("파일이 잘 만들어 졌음(비동기)")
//     }
// })
// 파일이 이미 있으면 내용을 수정해준다.

fs.writeFileSync("./Test/text.txt", "Hello nodejs123");
console.log("파일이 잘 만들어 졌음~(동기)");

// 파일을 읽어오자
// 전달한 익명함수의 매개변수 순서는 에러, 결과 순으로 작성
// fs.readFile("./Test/text.txt", "utf8", (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// })

// 동적으로 실행
let data = fs.readFileSync("./Test/text.txt", "utf8");
console.log(data);

// 삭제
// recursive 삭제할때 옵션으로
// 폴더 안에 있는 내용까지 삭제 하겠다.
fs.rm("./Test", { recursive: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("폴더가 잘 삭제됐음~")
    }
})