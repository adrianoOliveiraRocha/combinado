const PaymentRequest = (function() {
    return {
        save: function(data, connect, callback) {
            let stm = `
            insert into PaymentRequest (paymentLink, userId, message)
            values('${data.paymentLink}', ${data.userId}, '${data.message}')`
            connect.query(stm, callback);
        },

        getAll: function(connect, callback) {
            let query = "select * from PaymentRequest";
            connect.query(query, callback);
        },

        delete: function(requestPaymentId, connect, callback) {
            let stm = `delete from PaymentRequest where id = ${requestPaymentId}`;
            connect.query(stm, callback);
        },

        getForThisUser: function(userId, connect, callback) {
            let query = `select * from PaymentRequest where userId = ${userId}`;
            connect.query(query, callback);
        }
    }
})();

module.exports = () => {
    return PaymentRequest;
}