const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 处理post data
const getPostData = (req) => {
    const promise = new Promise((resolve, rejects) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {

            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            // chunk 本身是二进制格式， 通过 toString() 转换为字符串格式
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })

    })
    return promise
}

const serverHandle = (req, res) => {
    // 设置返回格式
    res.setHeader('Content-type', 'application/json')

    // 获取path
    req.path = req.url.split('?')[0]

    // 解析query---get
    req.query = querystring.parse(req.url.split('?')[1])

    // 解析post data---post
    getPostData(req).then(postData => {
        req.body = postData

        // 处理路由

        // 返回 promise
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(JSON.stringify(blogData))
            })
            return
        }
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                res.end(JSON.stringify(userData))
            })
            return
        }

        // 没有命中路由
        res.writeHead(404, { "Content-type": "text/plain" })
        res.write("404 not found\n")
        res.end()
    })
}
module.exports = serverHandle

// 查看当前环境
// env: process.env.NODE_ENV