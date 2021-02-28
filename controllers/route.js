const router = require('koa-simple-router')

const Controller = require('.')

const controller = new Controller()

module.exports = (app) => {
  app.use(
    router((_) => {
      _.get('/', controller.index())

      // 获取图书
      _.get('/book', controller.index())

      // 添加图书
      _.post('/book', controller.add())

      // 根据 id 获取图书
      _.get('/book/:id', controller.editpage())

      // 修改图书
      _.put('/book', controller.edit())

      // 删除图书
      _.delete('/book/:id', controller.delete())
    })
  )
}
