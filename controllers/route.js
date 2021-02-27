const router = require('koa-simple-router')

const Controller = require('.')

const controller = new Controller()

module.exports = (app) => {
  app.use(
    router((_) => {
      _.get('/', controller.index())

      // 首页
      _.get('/index', controller.index())
    })
  )
}
