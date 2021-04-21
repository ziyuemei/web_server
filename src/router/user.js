const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')

const handleUserRouter = (req, res) => {
    const method = req.method
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        const result = login(username, password)
        return result.then(data => {
            if (data.username) {
                // 设置 session
                req.session.username = data.username
                req.session.realname = data.realname

                // 同步到 Redis
                set(req.sessionId, req.session)

                return new SuccessModel()
            }
            return new ErrorModel('用户名或密码错误，登录失败')
        })
    }
}
module.exports = handleUserRouter