const router = require('koa-simple-router')

const Controller = require('.')

const controller = new Controller()

module.exports = (app) => {
  app.use(
    router((_) => {
      _.get('/', controller.index())

      // 获取图书
      _.get('/index', controller.index())

      // 添加图书
      _.get('/addpage', controller.addpage())
      _.post('/add', controller.add())

      // 修改图书
      _.get('/editpage', controller.editpage())
      _.post('/edit', controller.edit())

      // 删除图书
      _.get('/delete', controller.delete())
    })
  )
}
