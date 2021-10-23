const Core = (function() {
    return {
        saveMessage: function(data, connect, callback) {
            let stm = `insert into Message (email, _text) 
            values('${data.email}', '${data.message}')`
            connect.query(stm, callback)
        }
    }
})()

module.exports = function() {
    return Core
}