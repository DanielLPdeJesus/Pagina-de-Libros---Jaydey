
function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;
    var isValid = true;

    if (name.trim() == "") {
        document.getElementById("nameError").innerText = "Por favor, escribe tu nombre.";
        isValid = false;
    } else {
        document.getElementById("nameError").innerText = "";
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById("emailError").innerText = "Por favor, introduce una dirección de correo electrónico válida.";
        isValid = false;
    } else {
        document.getElementById("emailError").innerText = "";
    }

    if (subject.trim() == "") {
        document.getElementById("subjectError").innerText = "Por favor, escribe el motivo.";
        isValid = false;
    } else {
        document.getElementById("subjectError").innerText = "";
    }

    if (message.trim() == "") {
        document.getElementById("messageError").innerText = "Por favor, escribe tu mensaje.";
        isValid = false;
    } else {
        document.getElementById("messageError").innerText = "";
    }

    var words = message.trim().split(/\s+/).length;
    if (words > 100) {
        document.getElementById("messageError").innerText = "El mensaje debe tener menos de 100 palabras.";
        isValid = false;
    }

    return isValid;
}