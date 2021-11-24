
const ClientNotification = (function (application) {
  return {
    getTomorrowSheduling: function(callback) {
      const mysql = require('mysql')
      let connection = mysql.createConnection({
        host: 'localhost',
        user: 'adriano',
        password: '453231',
        database: 'combinado'
      })

      let sql = `
      select id, clientPhone, clientEmail from scheduling 
      where year(_datetime) = year(ADDDATE(CURDATE(), INTERVAL 1 DAY))
      and month(_datetime) = month(ADDDATE(CURDATE(), INTERVAL 1 DAY))
      and day(_datetime) = day(ADDDATE(CURDATE(), INTERVAL 1 DAY))`

      connection.connect()
      connection.query(sql, callback)
      connection.end(() => {
        console.log('Data base closed')
      })
    }
  }
})()

module.exports = ClientNotification;