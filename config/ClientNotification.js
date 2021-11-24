
const ClientNotification = (function (application) {
  return {
    getTomorrowSheduling: function(callback) {
      const connect = require('./connect')()
      let sql = `
      select clientPhone, clientEmail from scheduling 
      where _datetime = ADDDATE(CURDATE(), INTERVAL 1 DAY)`
      connect.query('select id from user', callback)
      // callback(null, sql)
    }
  }
})()

module.exports = ClientNotification;