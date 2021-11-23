const ClientNotification = (function () {
  return {
    getTomorrowSheduling: function(callback) {
      const connect = require('./connect')
      let sql = `
      select clientPhone, clientEmail from scheduling 
      where _datetime = ADDDATE(CURDATE(), INTERVAL 1 DAY)`
      connect.query(sql, callback)
    }
  }
})()

module.exports = ClientNotification;