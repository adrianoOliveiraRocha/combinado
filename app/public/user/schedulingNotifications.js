function schedulingNotifications() {
	
	var divResponse = document.getElementById("sNotifications");
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			divResponse.innerHTML = this.responseText;
		} else {
			divResponse.innerHTML = 'carregando...';
		}
	}

	xhttp.open("GET", "/user-notifications", true);
	xhttp.send();

};

function callNotifications() {
	schedulingNotifications();

	setInterval(() => {
		schedulingNotifications();
	}, 60000);
};