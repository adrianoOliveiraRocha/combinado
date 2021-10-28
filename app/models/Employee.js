const Employee = (function() {

  return {

      save: function(data, connect, callback) {
        let query = `
    		insert into employee (name, pwd, email, userid)
    		values('${data.name}', '${data.pwd}', '${data.email}',
    		${data.userid})`

        connect.query(query, callback)
      },

      getCredentials: function(employeeId, connect, callback) {
        let query = `select name, email, pwd, phone from employee where id = '${employeeId}'`;
        connect.query(query, callback)
      },

      saveEmployeeDays: function(employeeId, connect, callback) {
        var query = '';
        for (let i = 0; i <= 6; i++) {
            query += `
    				insert into employee_day(employeeId, dayCode)
    				values(${employeeId}, ${i})
    			`
        }
        connect.query(query, callback);
      },

      verify: function(data, connect, callback) {
        let stm = `
    		select * from employee
    		where email = '${data.email}' and pwd = '${data.pwd}'`;
        connect.query(stm, callback);
      },

      update: function(data, imageName, connect, callback) {
        var query;
        var aboutMe = data.aboutMe.trim();
        if (typeof imageName === 'undefined') {
            query = `
        		update employee set name = '${data.name}',
        		email = '${data.email}', pwd = '${data.encryptPwd}',
        		phone = '${data.phone}', address = '${data.address}',
        		aboutMe = '${aboutMe}'
        		where id = ${data.id}`
        } else {
            query = `
        		update employee set name = '${data.name}',
        		email = '${data.email}', pwd = '${data.encryptPwd}',
        		phone = '${data.phone}', address = '${data.address}',
        		aboutMe = '${aboutMe}', image = '${imageName}'
        		where id = ${data.id}`;
        }
        connect.query(query, callback);

      },

      getThis: function(employeeId, connect, callback) {
        let query = `select * from employee where id = '${employeeId}'`;
        connect.query(query, callback);
      },

      deleteED: function(employeeId, connect, callback) {
        let query = `delete from employee_day where employeeId = ${employeeId}`;
        connect.query(query, callback);
      },

      deleteES: function(employeeId, connect, callback) {
        let query = `delete from employee_service where employeeid = ${employeeId}`;
        connect.query(query, callback);
      },

      getImageName: function(connect, employeeId, callback) {
        let query = `select image from employee where id = ${employeeId}`;
        connect.query(query, callback);
      },

      deleteEmployee: function(employeeId, connect, callback) {
        let query = `
    	  delete from employee_service where employeeid = ${employeeId};
    	  delete from employee where id = ${employeeId}
    	  `;
        connect.query(query, callback);
      },

      getMyServices: function(employeeId, connect, callback) {
          let query = `select * from employee_service where employeeid = ${employeeId}`;
          connect.query(query, callback);
      },

      deleteMyServices: function(employeeId, connect, callback) {
          let query = `delete from employee_service where employeeid = ${employeeId}`;
          connect.query(query, callback);
      },

      updateMyServices: function(employeeId, userId, data, connect, callback) {

          var query = '';
          for (const idService in data) {
              query += `
		  insert into employee_service (employeeid, serviceid, userid)
		  values(${employeeId}, ${idService}, ${userId});`;
          }
          connect.query(query, callback);
      },

      editQueries: function(data, employeeId, connect, callback) {

          var days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
          var generalQuery = ``;
          var queryTime = data.time;

          for (let dayCode in days) {
              if (data['morningInit' + dayCode].length > 0 &&
                  data['morningEnd' + dayCode].length > 0 &&
                  data['morningInit' + dayCode] < data['morningEnd' + dayCode]) {
                  generalQuery += `update employee_day set morningInit = '${data['morningInit' + dayCode]}', morningEnd = '${data['morningEnd' + dayCode]}' where employeeId = ${employeeId} and dayCode = ${dayCode}; `;
              } else {
                  generalQuery += `update employee_day set morningInit = null, morningEnd = null where employeeId = ${employeeId} and dayCode = ${dayCode}; `;
              }

              if (data['afternoonInit' + dayCode].length > 0 &&
                  data['afternoonEnd' + dayCode].length > 0 &&
                  data['afternoonInit' + dayCode] < data['afternoonEnd' + dayCode]) {
                  generalQuery += `update employee_day set afternoonInit = '${data['afternoonInit' + dayCode]}', afternoonEnd = '${data['afternoonEnd' + dayCode]}' where employeeId = ${employeeId} and dayCode = ${dayCode}; `;
              } else {
                  generalQuery += `update employee_day set afternoonInit = null, afternoonEnd = null where employeeId = ${employeeId} and dayCode = ${dayCode}; `;
              }

              if (data['queryTime'].length > 0) {
                  generalQuery += `update employee_day set queryTime = ${data['queryTime']} where employeeId = ${employeeId} and dayCode = ${dayCode}; `;
              }
          }
          connect.query(generalQuery, callback);

      },

      getEmployeeDays: function(employeeId, connect, callback) {
          var query = `select * from employee_day where employeeId = ${employeeId}`;
          connect.query(query, callback);
      },

      getThisDay: function(employeeId, dayCode, connect, callback) {
          let query = `
          select * from employee_day
          where employeeId = ${employeeId} and dayCode = ${dayCode}`;
          connect.query(query, callback);
      },

      getOfThisUser: function(userId, connect, callback) {
          let query = `select * from employee where userid = ${userId}`;
          connect.query(query, callback);
      },

      getQueryTime: function(dayCode, employeeId, connect, callback) {
          let query = `
              select queryTime from employee_day
              where dayCode = ${dayCode} and employeeId = ${employeeId}`;
          connect.query(query, callback);
      },

      getCanceledSchedulings: function(employeeId, connect, callback) {
          let query = `
          select * from scheduling
          where employeeId = ${employeeId} and canceled = 1`;
          connect.query(query, callback);
      },

      getEmployeeScheduling: function(employeeId, connect, callback) {
        let query = `select * from scheduling where employeeId = ${employeeId}`
        connect.query(query, callback)
      },

      itHasSomeSheduling: function(employeeId, connect, callback) {
        let query = `
          select count(id) as howMany from scheduling
          where employeeId = ${employeeId} and canceled = 0`;
        connect.query(query, callback);
      }

  }

})();

module.exports = function() {
    return Employee;
};
