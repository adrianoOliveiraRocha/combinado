const Scheduling = (function() {

    return {

        save: function(data, connect, callback) {
            let stm = `
            insert into scheduling 
            (_datetime, comments, clientPhone, clientEmail, employeeId)
            values('${data.sqlDateTime}', '${data.comments}', 
            '${data.clientPhone}', '${data.clientEmail}', ${data.employeeId})`;
            connect.query(stm, callback);
        },

        getSchedulings: function(_datetime, employeeId, connect, callback) {
            let query = `
                select * from scheduling 
                where employeeid = ${employeeId}
                and _datetime like '${_datetime}%'
                and canceled = 0
                order by _datetime ASC`;
            connect.query(query, callback);
        },

        getAllSchedulings: function(employeeId, connect, callback) {
            let query = `
                select * from scheduling 
                where employeeid = ${employeeId}
                order by _datetime ASC`;
            connect.query(query, callback);
        },

        getOldSchedulings: function(employeeId, connect, callback) {
            let query = `
                select * from scheduling 
                where employeeid = ${employeeId}
                and curdate() > _datetime
                order by _datetime ASC`;
            connect.query(query, callback);
        },

        getNewSchedulings: function(employeeId, connect, callback) {
            let query = `
                select * from scheduling 
                where employeeid = ${employeeId}
                and curdate() <= _datetime
                order by _datetime ASC`;
            connect.query(query, callback);
        },

        isItBusy: function(time, schedulings, queryTime) {

            const rigthTime = (time) => {
                var arrTime = time.split(':');
                return arrTime[0] + ':' + arrTime[1];
            }

            var queryTime = parseInt(queryTime);
            var response = false;

            schedulings.forEach(scheduling => {

                if (time == rigthTime(scheduling._time)) {
                    response = true; // it is used
                } else {
                    var tMinutes = this.getMinutes(time);
                    var sMinutes = this.getMinutes(scheduling._time);
                    if (tMinutes < sMinutes && sMinutes < (tMinutes + queryTime)) {
                        /** Because of an changing in the configuration of the
                         * query time, it can to exists one scheduling between
                         * two hours
                         */
                        response = true; // it is busy
                    }
                }
            });

            return response;

        },

        getNotifications: function(currentDate, employeeId, connect, callback) {
            let query = `
                select id, _datetime 
                from scheduling 
                where _datetime >= '${currentDate}' 
                and employeeId = ${employeeId}
                order by _datetime;`;
            connect.query(query, callback);
        },

        getUserSchedulingNotifications: function(currentDate, userId, connect, callback) {
            let query = `
                select scheduling.id as schedulingId, scheduling._datetime 
                from scheduling, employee, user
                where user.id = ${userId} 
                and user.id = employee.userId 
                and scheduling.employeeId = employee.id
                and scheduling._datetime >= '${currentDate}'
                order by _datetime;`;
            connect.query(query, callback);
        },

        getMinutes: function(time) {
            tH = parseInt(time.split(':')[0]);
            tM = parseInt(time.split(':')[1]);
            const minutes = (tH * 60) + tM;
            return minutes;
        },

        getThis: function(schedulingId, connect, callback) {
            let query = `select * from scheduling where id = ${schedulingId}`;
            connect.query(query, callback);
        },

        showSchedulingToUser: function(schedulingId, connect, callback) {
            let query = `
                select scheduling.id as schedulingId, scheduling._datetime, scheduling.clientPhone, scheduling.clientEmail, scheduling.comments, scheduling.canceled,
                employee.name as employeeName, employee.email as employeeEmail, employee.phone as employeePhone  
                from scheduling, employee 
                where scheduling.employeeId = employee.id and scheduling.id = ${schedulingId}`;
            connect.query(query, callback);
        },

        getThisForDateTimeEmployee: function(params, connect, callback) {
            let query = `
                select * from scheduling 
                where _date = '${params.date}' 
                and employeeId = ${params.employeeId} 
                order by _time`;
            connect.query(query, callback);
        },

        getThisCancellable: function(schedulingId, connect, callback) {
            let query = `
                select count(*) as ICan from scheduling 
                where id = ${schedulingId} and _datetime >= curdate()`;
            connect.query(query, callback);
        },

        cancelSchuduling: function(schedulingId, connect, callback) {
            var stm = `
                update scheduling set canceled = 1
                where id = ${schedulingId}`;
            connect.query(stm, callback);
        },

        getMySchedulings: function(clientEmail, connect, callback) {
            let query = `
                select scheduling.id as schedulingId, scheduling._datetime, 
                employee.name as employeeName, user.website
                from scheduling, employee, user 
                where clientEmail = '${clientEmail}'
                and scheduling.employeeId = employee.id
                and user.id = employee.userid
                and _datetime >= curdate()
                and canceled = 0`;
            connect.query(query, callback);
        }

    }
})();

module.exports = () => {
    return Scheduling;
}