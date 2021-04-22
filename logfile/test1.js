const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')

// 读取文件内容
// fs.readFile(fileName, (err, data) => {
//     if (err) {
//         console.log(err)
//         return
//     }
//     // data 是二进制类型，需要转换为字符串
//     console.log(data.toString())
// })

// 写入文件
// const content = '这是新写入的\n'
// const opt = {
//     flag: 'w' // 追加在后面：a    覆盖前面的内容：w
// }
// fs.writeFile(fileName, content, opt, (err) => {
//     if (err) {
//         console.log(err)
//     }
// })

// 判断文件是否存在
// 被废弃
// fs.exists(fileName, (exist) => {
//     console.log(exist)
// })
fs.stat(fileName + '1', (err, stats) => {
    if (err) throw err;
    console.log(`stats: ${JSON.stringify(stats)}`);
});