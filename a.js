function add(a, b) {
    return a + b;
}

function mul(a, b) {
    return a * b;
}


// 导出一个函数
// module.exports = add;

// 导出多个函数---合成对象
module.exports = {
    add,
    mul
}