
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
      select scheduling.id, scheduling.clientPhone, scheduling.clientEmail, 
      user.companyName, user.companyEmail 
      from scheduling, employee, user 
      where year(_datetime) = year(ADDDATE(CURDATE(), INTERVAL 1 DAY))
      and month(_datetime) = month(ADDDATE(CURDATE(), INTERVAL 1 DAY))
      and day(_datetime) = day(ADDDATE(CURDATE(), INTERVAL 1 DAY))
      and scheduling.employeeId = employee.id
      and scheduling.canceled = 0
      and employee.userId = user.id`

      connection.connect()

      connection.query(sql, (err, result, fields) => {
        if(err) {
          console.log("OOPS!", err);
        } else {
          console.log("My result")
          console.log(result)
        }
      })

      connection.end(() => {
        console.log('Data base closed')
      })
      
    }
  }
})()

module.exports = ClientNotification;