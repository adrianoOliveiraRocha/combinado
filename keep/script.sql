-- select employee.name, service.name 
-- from employee, service, employee_service
-- where employee.id = employee_service.employeeid
-- and service.id = employee_service.serviceid
-- and employee.id = 31;

-- select employee.id, employee.email, user.username from employee, user where
-- employee.userid = user.id \G;

select scheduling.id as schedulingId, scheduling._datetime, employee.name
from scheduling, employee, user
where curdate() > scheduling._datetime
and scheduling.employeeId = employee.id
and employee.userid = user.id
and user.id = 4 
order by _datetime ASC;