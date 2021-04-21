const redis = require('redis')
const { REDIS_CONFIG } = require('../config/db')
    // 创建客户端
const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)
redisClient.on('error', err => {
    console.log('Redis 连接错误：', err)
})

function set(key, value) {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    redisClient.set(key, value, redis.print)
}

function get(key) {
    const promise = new Promise((resolve, rejects) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                rejects(err)
                return
            }
            if (val === null) {
                resolve(null)
                return
            }
            try {
                resolve(JSON.parse(val))
            } catch (error) {
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = {
    set,
    get
}