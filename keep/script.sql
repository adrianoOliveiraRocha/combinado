select scheduling.id as schedulingId, scheduling._datetime 
  from scheduling, employee, user
  where user.id = 4 
  and user.id = employee.userId 
  and scheduling.employeeId = employee.id
  and scheduling._datetime >= '2021-10-23 10:51:58'
  order by _datetime;