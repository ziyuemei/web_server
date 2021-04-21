const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
    const method = req.method
    if (method === 'GET' && req.path === '/api/user/login') {
        const { username, password } = req.query
        const result = login(username, password)
        return result.then(data => {
            if (data.username) {
                req.session.username = data.username
                req.session.realname = data.realname
                console.log(req.session)
                return new SuccessModel({ username: req.cookie.username })
            }
            return new ErrorModel('用户名或密码错误，登录失败')
        })
    }

    // 登录验证---测试
    if (method === 'GET' && req.path === '/api/user/login-test') {
        if (req.session.username) {
            return Promise.resolve(new SuccessModel({ session: req.session }))
        }
        return Promise.resolve(new ErrorModel('没有cookie，登录失败'))
    }

}
module.exports = handleUserRouter