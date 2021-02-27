const db = require('./db')

/**
 * 图书数据模型（增删改查）
 * @type {[type]}
 */

class BookModel {
  constructor() {}

  /**
   * 获取图书列表
   * @return {[type]}
   */
  async find() {
    let meta = {
      code: 0,
      message: '',
      data: [],
    }

    try {
      let data = await db.query(`SELECT * FROM book`)
      // console.log(data)

      if (data.length > 0) {
        meta.data = data
        meta.message = '获取成功'
        return Promise.resolve(meta)
      } else {
        meta.code = 1
        meta.message = '获取失败'
        return Promise.reject(meta)
      }
    } catch (err) {
      // console.log(err)
      meta.code = 1
      meta.message = err.message
      return Promise.reject(meta)
    }
  }

  /**
   * 根据 id 获取图书信息
   * @param  {Number}   id       图书 id
   * @return {[type]}
   */
  async findById(id) {
    let meta = {
      code: 0,
      message: '',
      data: [],
    }

    try {
      let data = await db.query(`SELECT * FROM book WHERE id=${id}`)

      if (data.length > 0) {
        meta.data = data[0]
        meta.message = '获取成功'
        return Promise.resolve(meta)
      } else {
        meta.code = 1
        meta.message = '获取失败'
        return Promise.reject(meta)
      }
    } catch (err) {
      // console.log(err)
      meta.code = 1
      meta.message = err.message
      return Promise.reject(meta)
    }
  }

  /**
   * 添加图书
   * @param  {Object}   book      图书对象
   * @return {[type]}
   */
  async add(book) {
    let meta = {
      code: 0,
      message: '',
      data: [],
    }

    try {
      let data = await db.query(`INSERT INTO book SET ?`, book)
      // console.log(data);

      if (data.affectedRows > 0) {
        meta.message = '添加成功'
        return Promise.resolve(meta)
      } else {
        meta.code = 1
        meta.message = '添加失败'
        return Promise.reject(meta)
      }
    } catch (err) {
      // console.log(err)
      meta.code = 1
      meta.message = err.message
      return Promise.reject(meta)
    }
  }

  /**
   * 更新图书
   * @param  {[type]}   book      图书对象
   * @return {[type]}
   */
  async update(book) {
    let meta = {
      code: 0,
      message: '',
      data: [],
    }

    try {
      let data = await db.query(
        `UPDATE book SET name=?,author=?,category=?,description=? WHERE id=?`,
        [book.name, book.author, book.category, book.description, book.id]
      )
      // console.log(data)

      if (data.affectedRows > 0) {
        meta.message = '修改成功'
        return Promise.resolve(meta)
      } else {
        meta.code = 1
        meta.message = '修改失败'
        return Promise.reject(meta)
      }
    } catch (err) {
      // console.log(err)
      meta.code = 1
      meta.message = err.message
      return Promise.reject(meta)
    }
  }

  /**
   * 删除图书
   * @param  {[type]}   id       图书 id
   * @return {[type]}
   */
  async deleteById(id) {
    let meta = {
      code: 0,
      message: '',
      data: [],
    }

    try {
      let data = await db.query(`DELETE FROM book WHERE id=${id}`)
      // console.log(data);

      if (data.affectedRows > 0) {
        meta.message = '删除成功'
        return Promise.resolve(meta)
      } else {
        meta.code = 1
        meta.message = '删除失败'
        return Promise.reject(meta)
      }
    } catch (err) {
      // console.log(err)
      meta.code = 1
      meta.message = err.message
      return Promise.reject(meta)
    }
  }
}

module.exports = BookModel
