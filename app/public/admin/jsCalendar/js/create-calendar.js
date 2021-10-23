var element = document.getElementById('my-calendar');
var myCalendar = jsCalendar.new(element);

myCalendar.onDateClick(function(event, date) {
    var responseChangeDate = document.getElementById('responseChangeDate');
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
    xhttp.open('GET', '/change-date?date=' + date, true);
    xhttp.send();
});

myCalendar.onMonthChange(function(event, date) {
    console.log(date.getMonth());
});