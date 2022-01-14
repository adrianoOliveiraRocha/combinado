module.exports = (application) => {

    application.get('/admin', (req, res) => {
        application.app.control.admin.home(req, res, application);
    });

    application.get('/admin-notifications', (req, res) => {
        application.app.control.admin.notifications(req, res, application);
    });

    application.get('/admin-profile', (req, res) => {
        application.app.control.admin.profile(req, res, application);
    });

    application.get('/admin-see-user', (req, res) => {
        application.app.control.admin.seeUser(req, res, application);
    });

    application.get('/admin-show-users', (req, res) => {
        application.app.control.admin.showUsers(req, res, application);
    });

    application.get('/user-detail', (req, res) => {
        application.app.control.admin.userDetails(req, res, application);
    });

    application.get('/create-notyfication', (req, res) => {
        application.app.control.admin.createNotyfication(req, res, application);
    });

    application.post('/create-notyfication', (req, res) => {
        application.app.control.admin.createNotyfication(req, res, application);
    });

    application.get('/show-notifications', function(req, res) {
        application.app.control.admin.showNotifications(req, res, application);
    });

    application.get('/delete-notification', function(req, res) {
        application.app.control.admin.deleteNotification(req, res, application);
    });

    application.get('/it-is-regular', (req, res) => {
        application.app.control.admin.itIsRegular(req, res, application);
    });

    application.get('/block', (req, res) => {
        application.app.control.admin.block(req, res, application);
    });

    application.get('/unblock', (req, res) => {
        application.app.control.admin.unblock(req, res, application);
    });

    application.get('/in-trial-period', function(req, res) {
        application.app.control.admin.inTrialPeriod(req, res, application);
    });

    application.get('/send-payment-order', (req, res) => {
        application.app.control.admin.sendPaymentOrder(req, res, application);
    });

    application.post('/send-payment-order', (req, res) => {
        application.app.control.admin.sendPaymentOrder(req, res, application);
    });

    application.get('/get-all-payments-requests', (req, res) => {
        application.app.control.admin.getAllPaymentRequests(req, res, application);
    });

    application.post('/payment-request-details', (req, res) => {
        application.app.control.admin.paymentRequestDetails(req, res, application);
    });

    application.post('/delete-payment-order', (req, res) => {
        console.log(application);
        application.app.control.admin.deletePaymentRequest(req, res, application);
    });

    application.get('/show-message', (req, res) => {
        application.app.control.admin.showMessage(req, res, application)
    })

    application.get('/message-datail', (req, res) => {
        application.app.control.admin.messageDatail(req, res, application)
    })

    application.get('/delete-message', (req, res) => {
        application.app.control.admin.deleteMessage(req, res, application)
    })

    application.get('/delete-service', (req, res) => {
        application.app.control.admin.deleteService(req, res, application)
    })

}