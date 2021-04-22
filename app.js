const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const {get, set } = require('./src/db/redis')
const { access } = require('./src/utils/log')

// 获取cookie过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000)) // 1天
    return d.toGMTString()
}

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
    // 记录日志
    // ${req.headers['user-agent']}   获取浏览器特性
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

    // 设置返回格式
    res.setHeader('Content-type', 'application/json')

    // 获取path
    req.path = req.url.split('?')[0]

    // 解析query---get
    req.query = querystring.parse(req.url.split('?')[1])

    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })

    // 解析session----使用redis
    let needSetCookie = false
    let userId = req.cookie.userid
    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`

        // 初始化session 中的 session 的值
        set(userId, {})
    }
    // 获取 session
    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
            if (sessionData === null) {
                // 初始化session 中的 session 的值
                set(req.sessionId, {})
                    // 设置 session
                req.session = {}
            } else {
                req.session = sessionData
            }

            // 解析post data---post
            return getPostData(req)
        }) // promise 链式调用
        .then(postData => {
            req.body = postData

            // 处理路由

            // 返回 promise
            const blogResult = handleBlogRouter(req, res)
            if (blogResult) {
                blogResult.then(blogData => {
                    if (needSetCookie) {
                        // 操作cookie
                        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                    }
                    res.end(JSON.stringify(blogData))
                })
                return
            }
            const userResult = handleUserRouter(req, res)
            if (userResult) {
                userResult.then(userData => {
                    if (needSetCookie) {
                        // 操作cookie
                        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                    }
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