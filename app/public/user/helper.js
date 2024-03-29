'use strict'

function fixPrice(obj) {
	const possibilites = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	let valueArray = obj.value.split('');
	let lastElement = valueArray[valueArray.length - 1];
	if(!(lastElement in possibilites) && lastElement !== ',' && lastElement !== '.') {
		valueArray[valueArray.length - 1] = "";
		var updateValue = valueArray.join("");
		document.getElementById(obj.id).value = updateValue;
	}
}

function simpleGetAjax(url, container) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			container.innerHTML = this.responseText;
		} else {
			container.innerHTML = '<h3>Carregando...</h3>'
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
      container.innerHTML = '<h3>Carregando...</h3>'
    }
  }

  xhr.open("POST", form.getAttribute('action'), true);
  xhr.send(formData);
}

function cancel() {
	let url = '/user-cancel'
	let container = document.getElementById("divResponse");
	simpleGetAjax(url, container)
}

const Employee = (function () {
	return {
		showEmployees() {
			let container = document.getElementById("divResponse");
			let url = "/show-employees";
			simpleGetAjax(url, container);		
		},

		newEmployee() {
			let url = '/new-employee'
			let container = document.getElementById("divResponse");
			simpleGetAjax(url, container)
		},

		saveNewEmployee() {
			let container = document.getElementById("divResponse");
			let form = document.getElementById('newEmployeeForm');
			simplePostAjax(form, container)
		},

		employeeDetail(employeeId) {
	
			let container = document.getElementById("divResponse");
			let form = document.createElement('form');
			form.action = '/employee-detail';
			
			// id
			let el = document.createElement('input')
			el.name = 'id'; 
			el.value = employeeId; 
			form.appendChild(el);
			
			// email
			el = document.createElement('input')
			el.name = 'email'; 
			el.value = document.getElementById('email_' + employeeId).value; 
			form.appendChild(el)
			
			// pwd
			el = document.createElement('input')
			el.name = 'pwd'; 
			el.value = document.getElementById('pwd_' + employeeId).value; 
			form.appendChild(el)
		
			// name
			el = document.createElement('input')
			el.name = 'name'; 
			el.value = document.getElementById('name_' + employeeId).value; 
			form.appendChild(el)
		
			// phone
			el = document.createElement('input')
			el.name = 'phone'; 
			el.value = document.getElementById('phone_' + employeeId).value; 
			form.appendChild(el)
		
			// address
			el = document.createElement('input')
			el.name = 'address'; 
			el.value = document.getElementById('address_' + employeeId).value; 
			form.appendChild(el)
		
			// userid
			el = document.createElement('input')
			el.name = 'userid'; 
			el.value = document.getElementById('userid_' + employeeId).value; 
			form.appendChild(el)
		
			// aboutMe
			el = document.createElement('input')
			el.name = 'aboutMe'; 
			el.value = document.getElementById('aboutMe_' + employeeId).value; 
			form.appendChild(el)
		
			// image
			el = document.createElement('input')
			el.name = 'image'; 
			el.value = document.getElementById('image_' + employeeId).value; 
			form.appendChild(el)
		
			// type
			el = document.createElement('input')
			el.name = 'type'; 
			el.value = document.getElementById('type_' + employeeId).value; 
			form.appendChild(el)
		
			simplePostAjax(form, container)
		},

		deleteEmployee(employeeId, image) {
			let container = document.getElementById("divResponse");
			let url = '/delete_employee?employeeId=' + employeeId + '&image=' + image;
			simpleGetAjax(url, container);
		}

	}
})();

const Service = (function () {
	return {
		new() {
			let url = '/new-service';
			let container = document.getElementById('divResponse');
			simpleGetAjax(url, container);		
		},

		save() {
			let container = document.getElementById('divResponse');
			let form = document.getElementById('formService');
			simplePostAjax(form, container)
		},

		show() {
			let url = '/show-services';
			let container = document.getElementById('divResponse');
			simpleGetAjax(url, container);
		}, 

		detail(serviceId, serviceName) {
			let url = '/service-detail?id=' + serviceId + '&name=' + serviceName;
			let container = document.getElementById('divResponse')
			simpleGetAjax(url, container)
		},

		edit() {
			
			let container = document.getElementById('divResponse');

			let form = document.createElement('form');
			form.action = '/edit-service';

			let inputId = document.getElementById('id');
			form.appendChild(inputId);

			let inputName = document.getElementById('name')
			form.appendChild(inputName);

			let inputPrice = document.getElementById('price')
			form.appendChild(inputPrice)

			simplePostAjax(form, container);
		},

		delete() {
			let container = document.getElementById('divResponse');
			let serviceId = document.getElementById('id').value;
			let url = '/delete-service?serviceId=' + serviceId;
			simpleGetAjax(url, container);
		}

	}
})();

const Scheduling = (function() {
	return {
		showScheduling(schedulingId) {
			let url = '/user-show-scheduling?schedulingId=' + schedulingId;
			let container = document.getElementById('divResponse');
			simpleGetAjax(url, container);
		}
	}
})();

const User = (function () {
	return {
		makeLink() {
			let url = '/make-link'
			let container = document.getElementById('divResponse');
			simpleGetAjax(url, container)
		},

		copyLink() {
			/* Get the text field */
			var copyText = document.getElementById("myInput");
			/* Select the text field */
			copyText.select();
			copyText.setSelectionRange(0, 99999); /*For mobile devices*/
			/* Copy the text inside the text field */
			document.execCommand("copy");
			
			/* Alert the copied text */
			alert("Copiado com sucesso!");
		},

		testLink() {
			let url = '/test-link', container = document.getElementById('divResponse')
			simpleGetAjax(url, container)
		}, 

		profile() {
			let container = document.getElementById('divResponse')
			let url = '/user-profile'
			simpleGetAjax(url, container)
		},

		editProfile() {
			let form = document.getElementById('profile-form')
			let container = document.getElementById('divResponse')
			simplePostAjax(form, container)
		}
	}
})()