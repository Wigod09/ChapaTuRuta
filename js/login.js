document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const message = document.getElementById("message");

    const loginContainer = document.querySelector(".login-container");
    const registerContainer = document.querySelector(".register-container");

    const registerLink = document.getElementById("registerLink");
    const loginLink = document.getElementById("loginLink");

    // Funciones para manejo de usuarios en localStorage
    const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];
    const saveUsers = (users) => localStorage.setItem("users", JSON.stringify(users));

    // Cambio entre Login y Registro
    registerLink.addEventListener("click", () => {
        loginContainer.classList.add("hidden");
        registerContainer.classList.remove("hidden");
        message.textContent = ""; // Limpiar mensajes
    });

    loginLink.addEventListener("click", () => {
        registerContainer.classList.add("hidden");
        loginContainer.classList.remove("hidden");
        message.textContent = ""; // Limpiar mensajes
    });

    // Validar inicio de sesión
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
    
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((u) => u.username === username && u.password === password);
    
        if (user) {
            // Guardar el usuario actual en localStorage
            localStorage.setItem("currentUser", JSON.stringify(user));
    
            message.style.color = "green";
            message.textContent = "Inicio de sesión exitoso. Redirigiendo...";
            setTimeout(() => {
                window.location.href = "principal.html"; // Redirigir al home principal
            }, 1000);
        } else {
            message.style.color = "red";
            message.textContent = "Usuario o contraseña incorrectos.";
        }
    });
    

    // Registrar nuevo usuario
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newUsername = document.getElementById("newUsername").value.trim();
        const newPassword = document.getElementById("newPassword").value.trim();
        const newName = document.getElementById("newName").value.trim();
        const newEmail = document.getElementById("newEmail").value.trim();
    
        const users = JSON.parse(localStorage.getItem("users")) || [];
    
        if (users.some((u) => u.username === newUsername)) {
            alert("El usuario ya existe. Intenta con otro nombre.");
        } else {
            users.push({
                username: newUsername,
                password: newPassword,
                name: newName,
                email: newEmail,
                profilePicture: "" // Vacío para usar la predeterminada
            });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Registro exitoso. Ahora puedes iniciar sesión.");
            registerContainer.classList.add("hidden");
            loginContainer.classList.remove("hidden");
        }
    });
    

    // DEBUG: Mostrar usuarios guardados en consola para verificar
    console.log("Usuarios guardados actualmente:", getUsers());
});
