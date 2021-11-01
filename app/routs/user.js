module.exports = (application) => {
	application.get('/user-home', (req, res) => {
		application.app.control.user.home(req, res, application);
	});

	application.get('/logout', (req, res) => {
		application.app.control.user.logout(req, res);
	});

	application.get('/user-profile', (req, res) => {
		application.app.control.user.profile(req, res, application);
	});

	application.post('/edit-profile', (req, res) => {
		application.app.control.user.editProfile(req, res, application);
	});

	application.get('/new-employee', (req, res) => {
		application.app.control.user.newEmployee(req, res, application);
	});

	application.get('/user-cancel', (req, res) => {
		application.app.control.user.cancel(req, res, application)
	})

	application.post('/new-employee', (req, res) => {
		application.app.control.user.newEmployee(req, res, application);
	});

	application.get('/show-employees', (req, res) => {
		application.app.control.user.showEmployees(req, res, application);
	});

	application.post('/employee-detail', (req, res) => {
		application.app.control.user.employeeDetail(req, res, application)
	})

	application.get('/send-login-pass', (req, res) => {
		application.app.control.user.sendLoginPass(req, res, application);
	});

	application.post('/send-login-pass', (req, res) => {
		application.app.control.user.sendLoginPass(req, res, application);
	});

	application.get('/new-service', (req, res) => {
		application.app.control.user.newService(req, res, application);
	});

	application.post('/new-service', (req, res) => {
		application.app.control.user.newService(req, res, application);
	});

	application.get('/show-services', (req, res) => {
		application.app.control.user.showServices(req, res, application);
	});

	application.post('/edit-service', (req, res) => {
		application.app.control.user.editService(req, res, application);
	});

	application.get('/delete-service', (req, res) => {
		application.app.control.user.deleteService(req, res, application);
	});

	application.get('/delete_employee', (req, res) => {
		application.app.control.user.deleteEmployee(req, res, application);
	});

	application.get('/user-all-schedulings', (req, res) => {
		application.app.control.user.userAllSchedulings(req, res, application);
	});

	application.get('/user-old-schedulings', (req, res) => {
		application.app.control.user.userOldSchedulings(req, res, application);
	});

	application.get('/user-new-schedulings', (req, res) => {
		application.app.control.user.userNewSchedulings(req, res, application);
	});

	application.get('/user-show-scheduling', (req, res) => {
		application.app.control.user.showScheduling(req, res, application);
	});

	application.post('/user-cancel-scheduling', (req, res) => {
		application.app.control.user.cancelScheduling(req, res, application);
	});

	application.get('/user-canceled-schedulings', (req, res) => {
		application.app.control.user.canceledSchedulings(req, res, application);
	});

	application.get('/user-notifications', (req, res) => {
		application.app.control.user.notifications(req, res, application);
	});

	application.get('/make-link', (req, res) => {
		application.app.control.user.makeLink(req, res, application);
	});

	application.get('/test-link', (req, res) => {
		application.app.control.user.testLink(req, res, application);
	});

	application.get('/user-settings', (req, res) => {
		application.app.control.user.settings(req, res, application);
	});

	application.post('/updateSettings', (req, res) => {
		application.app.control.user.updateSettings(req, res, application);
	});

	application.get('/run-join-us', (req, res) => {
		application.app.control.user.runJoinUs(req, res, application);
	});

	application.get('/billingAgremment', function(req, res) {
		application.app.control.user.billingAgremment(req, res, application);
	});

	application.get('/processagreement', function(req, res) {
		application.app.control.user.processAgreement(req, res, application);
	});

	application.get('/cancel', function(req, res) {
		application.app.control.user.cancelAgreement(req, res, application);
	});

	application.get('/reply-notification', (req, res) => {
		application.app.control.user.replyNotification(req, res, application);
	});

	application.get('/send-whatsapp-message-employee', (req, res) => {
		application.app.control.user.sendWhatsappMessageEmployee(req, res, application)
	})

	application.get('/employee-sheduling', (req, res) => {
		application.app.control.user.employeeScheduling(req, res, application)
	})

	application.get('/send-whatsapp-message-client', (req, res) => {
		application.app.control.user.sendWhatsappMessageClient(req, res, application)
	})
};
