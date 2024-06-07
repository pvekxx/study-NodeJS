const a = require("./index5") // === { obj : { name: "soon" } }

// const require = (path) => {
//     // 1. 해당 파일의 경로를 가져오고
//     // 2. 경로에 있는 파일의 소스코드를 실행 시키고
//     // 3. 반환값을 받아서 반환
// }

console.log("------------");
console.log(a.add());
console.log(this);