const config = require('../config')

module.exports.query = (sql, data = null) => {
  return new Promise((resolve, reject) => {
    const mysql = require('mysql')

    const connection = mysql.createConnection(config.mysql)

    connection.connect()

    connection.query(sql, data, (error, results) => {
      if (error) return reject(error)

      resolve(results)
    })

    connection.end()
  })
}
