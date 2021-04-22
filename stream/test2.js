// 读取文件所有内容
const fs = require('fs')
const path = require('path')
const http = require('http')

const fileName1 = path.resolve(__dirname, 'a.txt')

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        const readStream = fs.createReadStream(fileName1)
        readStream.pipe(res)
    }
})

server.listen(8000)