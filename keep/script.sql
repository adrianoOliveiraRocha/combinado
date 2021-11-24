SELECT ADDDATE(CURDATE(), INTERVAL 1 DAY);

select id, clientPhone, clientEmail from scheduling 
where year(_datetime) = year(ADDDATE(CURDATE(), INTERVAL 1 DAY))
and month(_datetime) = month(ADDDATE(CURDATE(), INTERVAL 1 DAY))
and day(_datetime) = day(ADDDATE(CURDATE(), INTERVAL 1 DAY))