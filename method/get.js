const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    req.path = req.url.split('?')[0]
    req.query = querystring.parse(req.url.split('?')[1])
    res.end(JSON.stringify(req.query))
})

server.listen(8000, () => {
    console.log('服务启动成功！')
});