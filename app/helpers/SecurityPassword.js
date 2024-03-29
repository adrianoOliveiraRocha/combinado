var crypto = require('crypto')
var algorithm = 'aes256'
var password = 'd6F3Efeq'

const SecurityPassword = (function() {
    return {
        encrypt: function(text) {
            var cipher = crypto.createCipher(algorithm, password)
            var crypted = cipher.update(text, 'utf8', 'hex')
            crypted += cipher.final('hex')
            return crypted
        },

        decrypt: function(text) {
            var decipher = crypto.createDecipher(algorithm, password)
            var dec = decipher.update(text, 'hex', 'utf8')
            dec += decipher.final('utf8')
            return dec
        }
    }
})()

module.exports = function() {
    return SecurityPassword
}