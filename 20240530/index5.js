// global 전역 객체
// global, module 생략 가능

exports.obj = { name: "soon" };
exports.add = () => {
    return 2;
};
console.log(module.exports);
console.log(this);


// const obj = {
//     name : "soon"
// };
// module.exports = obj

// const add = () => {
//     return 2;
// }
// module.exports = add