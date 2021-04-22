const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db')

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONFIG)

// 开始连接
con.connect()

// 统一执行 sql 语句
function exec(sql) {
    const promise = new Promise((resolve, rejects) => {
        con.query(sql, (err, res) => {
            if (err) {
                rejects(err)
                return
            }
            resolve(res)
        })
    })
    return promise
}

module.exports = {
    exec,
    escape: mysql.escape
}