const User = (function() {

	return {

		save: function(data, connect, callback) {
			var stm = `
				insert into user (username, pwd, email)
				values('${data.userName}', '${data.pwd}', '${data.email}')`;
			connect.query(stm, callback);
		},

		verify: function(data, connect, callback) {
				let stm = `
				select * from user
				where email = '${data.email}' and pwd = '${data.pwd}'`;
				connect.query(stm, callback);
		},

		update: function(data, imageName, connect, callback) {
			var query;

			if (typeof imageName === 'undefined') {
				query = `
				update user set username = '${data.username}',
				email = '${data.email}', pwd = '${data.encryptPwd}',
				website = '${data.website}', color1 = '${data.color1}', color2 = '${data.color2}'
				where id = ${data.id}`;
			} else {
				query = `
				update user set username = '${data.username}',
				email = '${data.email}', pwd = '${data.encryptPwd}',
				website = '${data.website}', color1 = '${data.color1}', color2 = '${data.color2}',
				image = '${imageName}' where id = ${data.id}`;
			}

			connect.query(query, callback);

		},

		getColors: function (userId, connect, callback) {
			let query = `select color1, color2 from user where id = ${userId}`;
			connect.query(query, callback)
		},

		getThis: function(userId, connect, callback) {
				let query = `select * from user where id = '${userId}'`;
				connect.query(query, callback);
		},

		getAll: function(userid, connect, callback) {
				var query = `select * from employee where userid = ${userid}`;
				connect.query(query, callback);
		},

		getAllUsers: function(connect, callback) {
				var query = `select * from user`;
				connect.query(query, callback);
		},

		getAllSchedulings: function(userId, connect, callback) {
				const query = `
						select employee.id as employeeId, scheduling.id as schedulingId, employee.name, scheduling._datetime
						from scheduling, employee, user
						where scheduling.employeeId = employee.id and employee.userid = user.id
						and user.id = ${userId}
						order by _datetime ASC`;
				connect.query(query, callback);
		},

		getOldSchedulings: function(userId, connect, callback) {
				const query = `
						select employee.id as employeeId, scheduling.id as schedulingId, employee.name, scheduling._datetime
						from scheduling, employee, user
						where scheduling.employeeId = employee.id and employee.userid = user.id
						and user.id = ${userId}
						and curdate() > scheduling._datetime
						order by _datetime ASC`;
				connect.query(query, callback);
		},

		getNewSchedulings: function(userId, connect, callback) {
				const query = `
						select employee.id as employeeId, scheduling.id as schedulingId, employee.name, scheduling._datetime
						from scheduling, employee, user
						where scheduling.employeeId = employee.id and employee.userid = user.id
						and user.id = ${userId}
						and curdate() <= scheduling._datetime
						order by _datetime ASC`;
				connect.query(query, callback);
		},

		getCanceledSchedulings: function(userId, connect, callback) {
				const query = `
						select employee.id as employeeId, scheduling.id as schedulingId, employee.name, scheduling._datetime
						from scheduling, employee, user
						where scheduling.employeeId = employee.id and employee.userid = user.id
						and user.id = ${userId}
						and canceled = 1
						order by _datetime ASC`;
				connect.query(query, callback);
		},

		deleteOldSchedulings: (connect, callback) => {
				let date = new Date();
				date.setMonth(date.getMonth() - 6);
				let year = date.getFullYear();
				let month = date.getMonth();
				let day = date.getDate();
				let sqlDate = `${year}-${month}-${day} 00-00-00`;
				let stm = `delete from scheduling where _datetime < '${sqlDate}'`;
				connect.query(stm, callback);
		},

		seeUser: (userId, connect, callback) => {
				let query = `select * from user where id = ${userId}`;
				connect.query(query, callback);
		},

		showUsers: (connect, callback) => {
				let query = 'select * from user where admin = 0';
				connect.query(query, callback);
		},

		billsToExpireToday: (connect, callback) => {
				let todayDate = new Date().getDate();
				if (todayDate > 28) todayDate = 1;
				let query = `
						select count(id) as quantity from user
						where day(creationDate) = '${todayDate}'`;
				connect.query(query, callback);
		},

		isItJoined: function(userId, connect, callback) {
				let query = `select joined from user where id = ${userId}`;
				connect.query(query, callback);
		},

		isTrialFinished: function(userId, connect, callback) {
				let query = `
						select (date_add(creationDate, interval 10 day) < curdate()) as trialFinshed
						from user where id = ${userId}`;
				connect.query(query, callback);
		},

		updateSettings: function(userId, data, connect, callback) {
				let stm = `
						update user set IReceiveClients = ${data.IReceiveClients == "on" ? 1 : 0},
						IHaveEmployeers = ${data.IHaveEmployeers == "on" ? 1 : 0}
						where id = ${userId}`;
				connect.query(stm, callback);
		},

		createNotification: function(data, connect, callback) {
				var stm = `
						insert into Notification (userId, message)
						values(${data.idToNotify}, '${data.message}')`;
				connect.query(stm, callback);
		},

		itIsRegular: function(userId, connect, callback) {
				var stm = `
						update user set paymentsOk = 1, blocked = 0 where id = ${userId};
						delete from Notification where userId = ${userId}`
				connect.query(stm, callback);
		},

		block: function(data, connect, callback) {
				let stm = `update user set blocked = 1 where id = ${data.idToBlock};`;
				connect.query(stm, callback);
		},

		unblock: function(data, connect, callback) {
				let stm = `update user set blocked = 0 where id = ${data.idToUnblock};`;
				connect.query(stm, callback);
		},

		agreement: function(userId, token, connect, callback) {
				let stm = `
						update user set joinedToken = '${token}', blocked = 0
						where id = ${userId};
						delete from Notification where userId = ${userId};`;
				connect.query(stm, callback);
		},

		getNotification: function(userId, connect, callback) {
				let query = `select * from Notification where userId = ${userId}`;
				connect.query(query, callback);
		},

		deleteNotification: function(notificationId, connect, callback) {
				let stm = `delete from Notification where id = ${notificationId}`;
				connect.query(stm, callback);
		},

		inTrialPeriod: (connect, callback) => {
				let query = "SELECT * from user where joinedToken = 'no-agreement'";
				connect.query(query, callback);
		},

		getNamesAndIds: function(connect, callback) {
				let query = "select username, id from user";
				connect.query(query, callback);
		}

	}

})();

module.exports = function() {
  return User;
};
