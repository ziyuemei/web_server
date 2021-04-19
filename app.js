const { rejects } = require('assert')
const { resolve } = require('path')
const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 处理post data
const getPostData = (req) => {
    const promise = new Promise((resolve, rejects) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        } else {
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
    return promise
}

const serverHandle = (req, res) => {
    // 设置返回格式
    res.setHeader('Content-type', 'application/json')

    // 获取path
    req.path = req.url.split('?')[0]

    // 解析query
    req.query = querystring.parse(req.url.split('?')[1])

    // 处理路由
    const blogData = handleBlogRouter(req, res)
    if (blogData) {
        res.end(JSON.stringify(blogData))
        return
    }
    const userData = handleUserRouter(req, res)
    if (userData) {
        res.end(JSON.stringify(userData))
        return
    }

    // 没有命中路由
    res.writeHead(404, { "Content-type": "text/plain" })
    res.write("404 not found\n")
    res.end()
}
module.exports = serverHandle

// 查看当前环境
// env: process.env.NODE_ENV