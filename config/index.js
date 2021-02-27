const path = require('path')

let config = {
  port: 3000,
  mysql: {
    host: 'localhost', // 主机地址
    user: 'root1', // 用户名
    password: '123456', // 密码
    database: 'test', // 数据库名
  },
}

module.exports = config
