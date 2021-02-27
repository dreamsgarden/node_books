class IndexController {
  constructor() {}
  // 首页
  index() {
    return (ctx, next) => {
      ctx.body = 'Hello Koa'
    }
  }
}

module.exports = IndexController
