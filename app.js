const Koa = require('koa')
const path = require('path')
const render = require('koa-art-template')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')

// 配置
const config = require('./config')

const app = new Koa()

// post数据
app.use(bodyParser())

// 静态文件
app.use(static(path.join(__dirname, 'public')))

// 配置 koa-art-template
render(app, {
  root: path.join(__dirname, 'views'), // 视图的位置
  extname: '.html', // 后缀名
  debug: process.env.NODE_ENV !== 'production', //  是否开启调试模式
})

// 开启路由
require('./controllers/route')(app)

//错误处理
require('./middlewares').error(app)

app.listen(config.port, () => {
  console.log('server is running...')
})
