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

function employeeDetail(employeeId) {
	let container = document.getElementById("divResponse");
	let form = document.getElementById('form_' + employeeId);
	let inputs = document.getElementsByClassName("id");
	let ids = []
	for(let i = 0; i < inputs.length; i++) {
		ids.push(parseInt(inputs.item(i).value));
	}
	ids.forEach((id) => {
		// id
		let el = document.createElement('input')
		el.name = 'id_' + id; 
		el.value = id; 
		form.appendChild(el);
		
		// email
		el = document.createElement('input')
		el.name = 'email_' + id; 
		el.value = document.getElementById('email_' + id).value; 
		form.appendChild(el)
		
		// pwd
		el = document.createElement('input')
		el.name = 'pwd_' + id; 
		el.value = document.getElementById('pwd_' + id).value; 
		form.appendChild(el)

		// name
		el = document.createElement('input')
		el.name = 'name_' + id; 
		el.value = document.getElementById('name_' + id).value; 
		form.appendChild(el)

		// phone
		el = document.createElement('input')
		el.name = 'phone_' + id; 
		el.value = document.getElementById('phone_' + id).value; 
		form.appendChild(el)

		// address
		el = document.createElement('input')
		el.name = 'address_' + id; 
		el.value = document.getElementById('address_' + id).value; 
		form.appendChild(el)

		// userid
		el = document.createElement('input')
		el.name = 'userid_' + id; 
		el.value = document.getElementById('userid_' + id).value; 
		form.appendChild(el)

		// aboutMe
		el = document.createElement('input')
		el.name = 'aboutMe_' + id; 
		el.value = document.getElementById('aboutMe_' + id).value; 
		form.appendChild(el)

		// image
		el = document.createElement('input')
		el.name = 'image_' + id; 
		el.value = document.getElementById('image_' + id).value; 
		form.appendChild(el)

		// type
		el = document.createElement('input')
		el.name = 'type_' + id; 
		el.value = document.getElementById('type_' + id).value; 
		form.appendChild(el)
	
	})

	simplePostAjax(form, container)
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
