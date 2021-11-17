module.exports = (application) => {
	application.get('/home-employee', (req, res) => {
		application.app.control.employee.index(req, res, application);
	});

	application.get('/employee-profile', (req, res) => {
		application.app.control.employee.profile(req, res);
	});

	application.post('/edit-employee-profile', (req, res) => {
		application.app.control.employee.editProfile(req, res, application);
	});

	application.get('/employee-services', (req, res) => {
		application.app.control.employee.employeeServices(req, res, application);
	});

	application.post('/update-my-services', (req, res) => {
		application.app.control.employee.updateMyServices(req, res, application);
	});

	application.get('/config-query', (req, res) => {
		application.app.control.employee.configQuery(req, res, application);
	});

	application.post('/edit-query-config', (req, res) => {
		application.app.control.employee.editQueryConfig(req, res, application);
	});

	application.get('/sheduling-notifications', (req, res) => {
		application.app.control.employee.shedulingNotifications(req, res, application);
	});

	application.get('/show-scheduling', (req, res) => {
		application.app.control.employee.showScheduling(req, res, application);
	});

	application.get('/show-all-schedulings', (req, res) => {
		application.app.control.employee.showAllSchedulings(req, res, application);
	});

	application.get('/show-old-scheduling', (req, res) => {
		application.app.control.employee.showOldSchedulings(req, res, application);
	});

	application.get('/show-new-scheduling', (req, res) => {
		application.app.control.employee.showNewSchedulings(req, res, application);
	});

	application.get('/show-canceled-scheduling', (req, res) => {
		application.app.control.employee.canceledScheduling(req, res, application);
	});

	application.post('/cancel-scheduling', (req, res) => {
		application.app.control.employee.cancelScheduling(req, res, application);
	});

	application.get('/send-whatsapp-message', (req, res) => {
		application.app.control.employee.sendWhatsappMessage(req, res, application);
	});

	application.get('/send-email-message', (req, res) => {
		application.app.control.employee.sendEmailMessage(req, res, application);
	});

	application.post('/send-email-message', (req, res) => {
		application.app.control.employee.sendEmailMessage(req, res, application);
	});

}