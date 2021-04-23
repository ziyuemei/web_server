const express = require('express');
const router = express.Router();
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', function(req, res, next) {
    const { username, password } = req.body
    const result = login(username, password)
    return result.then(data => {
        if (data.username) {
            // 设置 session
            req.session.username = data.username
            req.session.realname = data.realname

            res.json(new SuccessModel())
            return
        }
        res.json(new ErrorModel('用户名或密码错误，登录失败'))
    })
});

router.get('/session-test', (req, res, next) => {
    // const session = req.session
    if (req.session.username) {
        res.json({
            errono: 0,
            data: {
                msg: '登录成功',
                username: req.session.username
            }
        })
        return
    }
    res.json({
        errno: -1,
        msg: '登录失败'
    })
})

module.exports = router;