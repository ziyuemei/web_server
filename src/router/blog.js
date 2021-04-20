const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''

        // result 是个promise
        const result = getList(author, keyword)

        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const result = getDetail(id)

        return result.then(data => {
            return new SuccessModel(data)
        })
    }
    if (method === 'POST' && req.path === '/api/blog/new') {
        req.body.author = 'ziyuemei'
        const result = newBlog(req.body)

        return result.then(data => {
            return new SuccessModel(data)
        })
    }
    if (method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body)

        return result.then(data => {
            if (data) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新博客失败')
            }
        })
    }
    if (method === 'POST' && req.path === '/api/blog/del') {
        const author = 'ziyuemei'
        const result = delBlog(id, author)

        return result.then(data => {
            if (data) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除博客失败')
            }
        })
    }
}
module.exports = handleBlogRouter