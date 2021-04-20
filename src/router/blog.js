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

        // 直接返回假数据
        // const listData = getList(author, keyword)
        // return new SuccessModel(listData)

        // result 是个promise
        const result = getList(author, keyword)

        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }
    if (method === 'GET' && req.path === '/api/blog/detail') {
        // const data = getDetail(id)
        // return new SuccessModel(data)

        const result = getDetail(id)

        return result.then(data => {
            return new SuccessModel(data)
        })
    }
    if (method === 'POST' && req.path === '/api/blog/new') {
        // const data = newBlog(req.body)
        // return new SuccessModel(data)

        req.body.author = 'ziyuemei'
        const result = newBlog(req.body)

        return result.then(data => {
            return new SuccessModel(data)
        })
    }
    if (method === 'POST' && req.path === '/api/blog/update') {
        // const data = updateBlog(id, req.body)
        // if (data) {
        //     return new SuccessModel()
        // } else {
        //     return new ErrorModel('更新博客失败')
        // }

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
        // const data = delBlog(id)
        // if (data) {
        //     return new SuccessModel()
        // } else {
        //     return new ErrorModel('删除博客失败')
        // }

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