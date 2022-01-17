Não dá pra atualizar porque a tupla não existe. Tem que inserir 

update employee_day set morningInit = '07:50', morningEnd = '12:45' 
where employeeId = 2 and dayCode = 0;
update employee_day set afternoonInit = '14:45', afternoonEnd = '19:50' 
where employeeId = 2 and dayCode = 0; 
update employee_day set queryTime = 30 where employeeId = 2 and dayCode = 0; 
update employee_day set morningInit = null, morningEnd = null 
where employeeId = 2 and dayCode = 1; 
update employee_day set afternoonInit = null, afternoonEnd = null 
where employeeId = 2 and dayCode = 1; 
update employee_day set queryTime = 30 where employeeId = 2 and dayCode = 1; 
update employee_day set morningInit = null, morningEnd = null where employeeId = 2 
and dayCode = 2; 
update employee_day set afternoonInit = null, afternoonEnd = null 
where employeeId = 2 and dayCode = 2; 
update employee_day set queryTime = 30 where employeeId = 2 and dayCode = 2; 
update employee_day set morningInit = null, morningEnd = null 
where employeeId = 2 and dayCode = 3; 
update employee_day set afternoonInit = null, afternoonEnd = null 
where employeeId = 2 and dayCode = 3; 
update employee_day set queryTime = 30 where employeeId = 2 and dayCode = 3; 
update employee_day set morningInit = null, morningEnd = null 
where employeeId = 2 and dayCode = 4; 
update employee_day set afternoonInit = null, afternoonEnd = null 
where employeeId = 2 and dayCode = 4; 
update employee_day set queryTime = 30 where employeeId = 2 and dayCode = 4; 
update employee_day set morningInit = null, morningEnd = null 
where employeeId = 2 and dayCode = 5; 
update employee_day set afternoonInit = null, afternoonEnd = null 
where employeeId = 2 and dayCode = 5; 
update employee_day set queryTime = 30 where employeeId = 2 and dayCode = 5; 
update employee_day set morningInit = null, morningEnd = null 
where employeeId = 2 and dayCode = 6; 
update employee_day set afternoonInit = null, afternoonEnd = null 
where employeeId = 2 and dayCode = 6; 
update employee_day set queryTime = 30 where employeeId = 2 and dayCode = 6;