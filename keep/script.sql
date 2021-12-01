select scheduling.id as schedulingId, scheduling.clientPhone, scheduling.clientEmail, user.companyName, user.companyEmail 
from scheduling, employee, user 
where year(_datetime) = year(ADDDATE(CURDATE(), INTERVAL 1 DAY))
and month(_datetime) = month(ADDDATE(CURDATE(), INTERVAL 1 DAY))
and day(_datetime) = day(ADDDATE(CURDATE(), INTERVAL 1 DAY))
and scheduling.employeeId = employee.id
and employee.userId = user.id