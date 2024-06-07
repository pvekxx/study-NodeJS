const data = {
    name: "soon",
    age: 20
}

console.log(data);
console.log(JSON.stringify(data));

const dataString = JSON.stringify(data);
// 인코딩
const buf = Buffer.from(dataString); // 기본 인코딩은 utf8 // buffer의 형태로 담는다

console.log(buf);
console.log(buf.toJSON()); // 버퍼의 형태에서 JSON으로

console.log(buf.toString()); // 버퍼의 형태에서 문자열로