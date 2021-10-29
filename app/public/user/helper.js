function showEmployeeScheduling(employeeId) {
  var divResponse = document.getElementById("divResponse");
  var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			divResponse.innerHTML = this.responseText;
		} else {
			divResponse.innerHTML = 'carregando...';
		}
	}

	xhttp.open("GET", "/employee-sheduling?id=" + employeeId, true);
	xhttp.send();

}

function deleteEmployee(employeeId) {
  var divResponse = document.getElementById("divResponse");
  var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			divResponse.innerHTML = this.responseText;
		} else {
			divResponse.innerHTML = 'carregando...';
		}
	}

	xhttp.open("GET", "/delete_employee?id=" + employeeId, true);
	xhttp.send();
}

function showEmployees() {
  var divResponse = document.getElementById("divResponse");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      divResponse.innerHTML = this.responseText;
    } else {
      divResponse.innerHTML = 'carregando...';
    }
  }

  xhttp.open("GET", "/show-employees", true);
  xhttp.send();
}
