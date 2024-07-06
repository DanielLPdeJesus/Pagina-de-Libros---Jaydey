
    function validateForm() {
        var name = document.getElementById("name").value;
        var username = document.getElementById("username").value;
        var number = document.getElementById("number").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var isValid = true;


        if (name.trim() == "") {
            document.getElementById("nameError").innerText = "Por favor, escribe tu nombre.";
            isValid = false;
        } else {
            document.getElementById("nameError").innerText = "";
        }

        if (username.trim() == "") {
            document.getElementById("usernameError").innerText = "Por favor, escribe tu nombre de usuario.";
            isValid = false;
        } else {
            document.getElementById("usernameError").innerText = "";
        }

        if (number.trim() == "" || number.length != 10) {
            document.getElementById("numberError").innerText = "Por favor, introduce un número de teléfono válido.";
            isValid = false;
        } else {
            document.getElementById("numberError").innerText = "";
        }

        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById("emailError").innerText = "Por favor, introduce una dirección de correo electrónico válida.";
            isValid = false;
        } else {
            document.getElementById("emailError").innerText = "";
        }

        if (password.length < 6 || password.length > 15) {
            document.getElementById("passwordError").innerText = "La contraseña debe tener entre 6 y 15 caracteres.";
            isValid = false;
        } else {
            document.getElementById("passwordError").innerText = "";
        }

        return isValid;
    }