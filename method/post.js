const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        console.log('content-type:', req.headers['content-type'])
        let postData = ''
        req.on('data', chunk => {
            // chunk 本身是二进制格式， 通过 toString() 转换为字符串格式
            postData += chunk.toString()
        })
        req.on('end', () => {
            console.log('postData:', postData)
            res.end("接收完毕")
        })
    }
})

server.listen(8000, () => {
    console.log('服务启动成功！')
});