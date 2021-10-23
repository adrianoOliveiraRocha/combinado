function editService(serviceId) {
    var elements = document.getElementById("form" + serviceId);
    var formData = new FormData();
    formData.append('id', serviceId);
    for (let i = 0; i < elements.length; i++) {
        formData.append(elements[i].name, elements[i].value);
    }

    var divResponse = document.getElementById("responseEditService" + serviceId);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            divResponse.innerHTML = this.responseText;
        }
    }

    xhttp.open("POST", "/edit-service");
    xhttp.send(formData);
}

function deleteService(serviceId) {
    location.href = "/delete-service?serviceId=" + serviceId;;
}