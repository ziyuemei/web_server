// a 文件单独导出一个函数
// const add = require('./a');

// a 文件导出多个函数---对象
const { add, mul } = require('./a')

var sum = add(10, 20);
var res = mul(10, 20);
console.log(sum, res);