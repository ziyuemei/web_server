const express = require('express');
const router = express.Router();
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.get('/list', function(req, res, next) {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''

    // 只查询自己的博客---管理员界面
    // if (req.query.isadmin) {
    //     const loginCheckResult = loginCheck(req)
    //     if (loginCheckResult) {
    //         return loginCheckResult
    //     }
    //     author = req.session.username
    // }

    // result 是个promise
    const result = getList(author, keyword)

    return result.then(listData => {
        res.json(new SuccessModel(listData))
    })
});

module.exports = router;