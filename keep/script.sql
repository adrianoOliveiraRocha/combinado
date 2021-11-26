-- SELECT ADDDATE(CURDATE(), INTERVAL 1 DAY);

select scheduling.id, scheduling.clientEmail, employee.name, user.enterpriseName 
from scheduling, employee, user 
where scheduling.employeeId = employee.id
and employee.userid = user.id
and year(_datetime) = year(ADDDATE(CURDATE(), INTERVAL 1 DAY))
and month(_datetime) = month(ADDDATE(CURDATE(), INTERVAL 1 DAY))
and day(_datetime) = day(ADDDATE(CURDATE(), INTERVAL 1 DAY))