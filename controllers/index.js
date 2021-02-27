const BookModel = require('../models')

const bookModel = new BookModel()

class IndexController {
  constructor() {}

  // 获取图书
  index() {
    return async function (ctx) {
      try {
        let res = await bookModel.find()
        // console.log(res)

        if (res.code == 0) {
          ctx.render('index', {
            data: res.data,
          })
        } else {
          ctx.body = '获取失败'
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  // 添加图书页
  addpage() {
    return async function (ctx) {
      await ctx.render('addpage')
    }
  }

  // 添加数据处理
  add() {
    return async function (ctx) {
      let postData = ctx.request.body

      try {
        let res = await bookModel.add(postData)
        console.log(res)

        if (res.code == 0) {
          // 跳转首页
          ctx.redirect('/index')
        } else {
          ctx.body = '添加失败'
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  // 修改图书页
  editpage() {
    return async function (ctx) {
      let id = ctx.request.query.editid

      try {
        let res = await bookModel.findById(id)
        console.log(res)

        if (res.code == 0) {
          ctx.render('editpage', {
            data: res.data,
          })
        } else {
          ctx.body = '获取失败'
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  // 修改数据处理
  edit() {
    return async function (ctx) {
      let postData = ctx.request.body

      try {
        let res = await bookModel.update(postData)
        console.log(res)

        if (res.code == 0) {
          // 跳转首页
          ctx.redirect('/index')
        } else {
          ctx.body = '编辑失败'
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  // 删除图书
  delete() {
    return async function (ctx) {
      let id = ctx.query.deleteid

      try {
        let res = await bookModel.deleteById(id)
        console.log(res)

        if (res.code == 0) {
          // 跳转首页
          ctx.redirect('/index')
        } else {
          ctx.body = '删除失败'
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}

module.exports = IndexController
