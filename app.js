const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

const app = express();

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
    client: redisClient
})

app.use(session({
    secret: 'xhdss_999', // 密匙
    cookie: {
        // 默认
        // path: '/',
        // httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    },
    store: sessionStore
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);


module.exports = app;