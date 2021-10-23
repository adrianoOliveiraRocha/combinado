const Message = (function () {
  return {
    getAll: function(connect, callback) {
      let q = 'select * from Message'
      connect.query(q, callback)
    },

    getMessage: function(connect, messageId, callback) {
      let q = `select * from Message where id = ${messageId}`
      connect.query(q, callback)
    },

    delete: function(connect, messageId, callback) {
      let q = `delete from Message where id = ${messageId}`
      connect.query(q, callback)
    }
  }
})()

module.exports = Message