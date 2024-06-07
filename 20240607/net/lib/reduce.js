// reduce
let a = [1, 2, 3, 4, 5, 6];
// 쵝값을 지정할수 있고
// []          0
// acc = 1     1
// acc = 2     2
const result = a.reduce((acc, content) => {
    acc.push(content + 1);
    return acc
}, [])

console.log(result);