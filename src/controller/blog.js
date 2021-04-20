const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    // 1=1 是占位符，避免 author 和 keyword 都没值得情况
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    // 返回 promise
    return exec(sql)
}

const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    // blogData 是一个博客对象，包含 title content 属性
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createtime = Date.now()
    const sql = `
    insert into blogs (title,content,createtime,author)
    values ('${title}','${content}','${createtime}','${author}');`

    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    // id： 要更新博客的 ID
    // blogData 是一个博客对象，包含 title content 属性
    const title = blogData.title
    const content = blogData.content

    const sql = `
    update blogs set title='${title}', content='${content}' where id='${id}';`

    return exec(sql).then(updatetData => {
        if (updatetData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delBlog = (id, author) => {
    // id： 要删除博客的 ID
    const sql = `delete from blogs where id='${id}' and author='${author}';`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}