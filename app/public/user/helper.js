'use strict'

function simpleGetAjax(url, container) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			container.innerHTML = this.responseText;
		} else {
			container.innerHTML = 'carregando...';
		}
	}

	xhttp.open("GET", url, true);
	xhttp.send();
}

function simplePostAjax(form, container) {
  var xhr = new XMLHttpRequest();
  var formData = new FormData(form)

  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
      container.innerHTML = xhr.response;
    } else {
      container.innerHTML = "<h3>Carregando...</h3>"
    }
  }

  xhr.open("POST", form.getAttribute('action'), true);
  xhr.send(formData);
}

function showEmployees() {
  let container = document.getElementById("divResponse");
	let url = "/show-employees";
  simpleGetAjax(url, container);
}

function newEmployee() {
	let url = '/new-employee'
	let container = document.getElementById("divResponse");
	simpleGetAjax(url, container)
}

function saveNewEmployee() {
	let container = document.getElementById("divResponse");
	let form = document.getElementById('newEmployeeForm');
	simplePostAjax(form, container)
}

function employeeDetail() {
	let url = '/employee-detail'
	let container = document.getElementById("divResponse");
	simpleGetAjax(url, container)
}

function cancel() {
	let url = '/user-cancel'
	let container = document.getElementById("divResponse");
	simpleGetAjax(url, container)
}

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
