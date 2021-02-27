const middlewares = {
  error(app) {
    app.use(async (ctx, next) => {
      try {
        await next()
      } catch (err) {
        console.log(err)
        ctx.status = 500
        ctx.body = '服务器忙，请稍后重试！'
      }
    })
    app.use(async (ctx, next) => {
      await next()
      if (ctx.status != 404) return

      ctx.status = 404
      ctx.body = `<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>`
    })
  },
}
module.exports = middlewares
