var element = document.getElementById('my-calendar');
var myCalendar = jsCalendar.new(element);

myCalendar.onDateClick(function(event, date) {
    var responseChangeDate = document.getElementById('responseChangeDate');
    var employeeId = document.getElementById('employeeId').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            responseChangeDate.innerHTML = this.response;
        } else {
            responseChangeDate.innerHTML = `
            <div class="alert alert-warning d-flex justify-content-center">
              Carregando...
            </div>`;
        }
    }
    xhttp.open('GET', '/core-change-date?date=' + date + '&employeeId=' + employeeId, true);
    xhttp.send();
});

myCalendar.onMonthChange(function(event, date) {
    console.log(date.getMonth());
});