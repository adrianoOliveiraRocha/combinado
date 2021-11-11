'use strict'

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

const Employee = (function () {
  return {
    profile() {
      let url = '/employee-profile'
      let container = document.getElementById('divResponse')
      simpleGetAjax(url, container)
    },

    edit() {
      let form = document.getElementById('form-employee')
      let container = document.getElementById('divResponse')
      simplePostAjax(form, container)
    },

    services() {
      let url = '/employee-services'
      let container = document.getElementById('divResponse')
      simpleGetAjax(url, container)
    }, 

    updateServices() {
      let container = document.getElementById('divResponse')
      let form = document.getElementById('services-form')
      simplePostAjax(form, container)
    }, 

    configQuery() {
      let url = '/config-query'
      let container = document.getElementById('divResponse')
      simpleGetAjax(url, container)
    },

    editConfigQuery() {
      let container = document.getElementById('divResponse')
      let form = document.getElementById('query-form')
      simplePostAjax(form, container);
    },

    showScheduling(schedulingId) {
      let container = document.getElementById('divResponse')
      let url = '/show-scheduling?schedulingId=' + schedulingId
      simpleGetAjax(url, container)
    }
  }
})();