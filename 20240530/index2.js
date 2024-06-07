// 작업을 할때
// 하나의 파일에 기능의 내용을 모두 작성하면
// 유지보수도 힘들다 변수명 겹치고
// 모듈화 하나의 큰 프로그램의 가장 작은 단위
// 모듈은 각각의 파일 단위로 구분 되고
// 파일의 내용은 필요한 기능들의 함수나 변수들이 포함되어 있는것.

const devClass = [
    {
        name: "조녁",
        age: 20,
        comment() {
            console.log("안녕");
            return "a"
        }
    }
]

console.log(devClass[0].comment());
// nodejs 런타임 환경에서 실행
// node "파일의 경로"

module.exports = devClass;
// index2.js에서 파일에서 내보낼 데이터