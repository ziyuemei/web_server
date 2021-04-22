const fs = require('fs')
const path = require('path')

// 生成接收数据的水桶
function createWriteStream(fileName) {
    const fullFileName = path.resolve(__dirname, '../', '../', 'logs', fileName)
    const writeStream = fs.createWriteStream(fullFileName, { flags: 'a' })
    return writeStream
}

// 写日志
function writeLog(writeStream, log) {
    writeStream.write(log + '\n')
}

const accessWriteStream = createWriteStream('access.log')
const errorWriteStream = createWriteStream('error.log')
const eventWriteStream = createWriteStream('event.log')

// 写 访问 日志
function access(log) {
    writeLog(accessWriteStream, log)
}
// 写 错误 日志
function problem(log) {
    writeLog(errorWriteStream, log)
}
// 写 自定义事件 日志
function custom(log) {
    writeLog(eventWriteStream, log)
}

module.exports = {
    access,
    problem,
    custom
}