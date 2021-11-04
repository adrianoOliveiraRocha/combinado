select employee.name, service.name 
from employee, service, employee_service
where employee.id = employee_service.employeeid
and service.id = employee_service.serviceid
and employee.id = 31;