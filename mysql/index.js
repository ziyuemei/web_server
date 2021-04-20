const mysql = require('mysql')

// 创建连接对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ziyuemei999.',
    port: '3306',
    database: 'myblog'
})

// 开始连接
con.connect()

// 执行sql语句
const sql = 'select id,username from users;'
con.query(sql, (err, res) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(res)
})

// 关闭连接
con.end()