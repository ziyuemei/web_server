const fs = require('fs')
const path = require('path')
const readline = require('readline')

// 文件名
const fileName = path.resolve(__dirname, '../', '../', 'logs', 'access.log')

// 创建 read stream 读取文件
const readStream = fs.createReadStream(fileName)

// 创建 readline 对象
const rl = readline.createInterface({
    input: readStream
})

let chromeNum = 0
let sum = 0

// 逐行读取
rl.on('line', lineData => {
    if (!lineData) {
        return
    }
    // 记录总行数
    sum++
    const arr = lineData.split(' -- ')
    if (arr[2] && arr[2].indexOf('Chrome') > 0) {
        // 记录谷歌浏览器的占比
        chromeNum++
    }
})

// 监听读取完成
rl.on('close', () => {
    console.log('谷歌占比：', chromeNum / sum, '--- 谷歌：', chromeNum, ' --- 总数：', sum)
})