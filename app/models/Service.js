const Service = (function() {

	return {

		save: function(data, connect, callback) {
			let stm = `
			insert into service (name, userid)
			values('${data.name}', ${data.userid})`;
			connect.query(stm, callback);
		},

		getAll: function(userid, connect, callback) {
			var query = `select * from service where userid = ${userid}`;
			connect.query(query, callback);
		},

		edit: function(data, connect, callback) {
			let query = `update service set name = '${data.name}', 
			price = ${data.price.replace(',', '.')} where id = ${data.id}`;

			connect.query(query, callback);
		},

		delete: function(serviceId, connect, calback) {
				let query = `delete from service where id = ${serviceId}`;
				connect.query(query, calback);
		},

		saveES: function(employeeId, userId, services, connect, calback) {
				var query = '';

				if (typeof services == 'string') {
						query += `
						insert into employee_service (employeeid, serviceid, userid)
						values(${employeeId}, ${services}, ${userId});`;
				} else {
						if (services !== undefined) {
								services.forEach(service => {
										query += `
										insert into employee_service (employeeid, serviceid, userid)
										values(${employeeId}, ${service}, ${userId});`;
								});
						};
				}

				connect.query(query, calback);
		},

		getServicesOfThisEmployeers: function(connect, employeers, callback) {
				var queries = [];
				var generalQuery = '';
				if (employeers.length == 1) {
						// employeers isn't a array. Because this user has just one employee.
						// so you have just one object
						let query = `
						select service.name as service, employee.id as employeeId
						from employee, service, employee_service
						where employee.id = employee_service.employeeid
						and service.id = employee_service.serviceid
						and employee.id = ${employeers[0].id};
						`;
						queries.push(query);
				} else {
						employeers.forEach(employee => {
								let query = `
								select service.name as service, employee.id as employeeId
								from employee, service, employee_service
								where employee.id = employee_service.employeeid
								and service.id = employee_service.serviceid
								and employee.id = ${employee.id};
								`;
								queries.push(query);
						});
				}

				queries.forEach(query => {
						generalQuery += query;
				});

				connect.query(generalQuery, callback);
		}

	}

})();

module.exports = function() {
    return Service;
};