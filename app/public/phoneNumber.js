const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('keyup', event => {
    var value = phoneInput.value;
    var length = phoneInput.value.length;
    if (length == 2) {
        var ddd = parseInt(phoneInput.value);
        (isNaN(ddd) ? phoneInput.value = '' : phoneInput.value = '(' + ddd + ')');
    }
});