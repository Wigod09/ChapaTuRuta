document.addEventListener("DOMContentLoaded", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const profilePictureForm = document.getElementById("profile-picture-form");
    const newProfilePictureInput = document.getElementById("newProfilePicture");

    if (currentUser) {
        // Mostrar datos del usuario
        document.getElementById("profile-name").textContent = "Nombre: " + currentUser.name;
        document.getElementById("profile-email").textContent = "Email: " + currentUser.email;

        // Mostrar la imagen del perfil o usar la predeterminada
        const profilePicture = currentUser.profilePicture || "../img/user.jpg";
        document.getElementById("profile-picture").src = profilePicture;
    } else {
        alert("Por favor, inicia sesión para acceder a tu perfil.");
        window.location.href = "..../Ruta/html/index.html";
    }

    // Cambiar la foto de perfil
    profilePictureForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const file = newProfilePictureInput.files[0];
        if (file) {
            const reader = new FileReader();
    
            reader.onload = function (event) {
                const img = new Image();
                img.onload = function () {
                    // Crear un canvas para redimensionar la imagen
                    const canvas = document.createElement("canvas");
                    const context = canvas.getContext("2d");
                    const size = 150;
                    canvas.width = size;
                    canvas.height = size;
    
                    // Dibujar la imagen redimensionada en el canvas
                    context.drawImage(img, 0, 0, size, size);
    
                    // Obtener la imagen redimensionada en formato Base64
                    const base64Image = canvas.toDataURL("image/jpeg", 0.9); // Calidad del 90%
    
                    // Actualizar la imagen en la página
                    document.getElementById("profile-picture").src = base64Image;
    
                    // Guardar en localStorage
                    currentUser.profilePicture = base64Image;
                    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    
                    // Actualizar en el listado de usuarios
                    const users = JSON.parse(localStorage.getItem("users")) || [];
                    const userIndex = users.findIndex((u) => u.username === currentUser.username);
                    if (userIndex !== -1) {
                        users[userIndex].profilePicture = base64Image;
                        localStorage.setItem("users", JSON.stringify(users));
                    }
    
                    alert("Foto de perfil actualizada.");
                };
    
                img.src = event.target.result; // Cargar la imagen seleccionada
            };
    
            reader.readAsDataURL(file); // Leer la imagen como Base64
        } else {
            alert("Por favor, selecciona una imagen.");
        }
    });
    
});


// Configurar los botones del menú para redirigir a las pantallas correspondientes
document.getElementById("home").addEventListener("click", () => window.location.href = "principal.html");
document.getElementById("route").addEventListener("click", () => window.location.href = "ruta.html");
document.getElementById("ticket").addEventListener("click", () => window.location.href = "ticket.html");
document.getElementById("payment").addEventListener("click", () => window.location.href = "pago.html");
document.getElementById("profile").addEventListener("click", () => window.location.href = "perfil.html");

// Función para cerrar sesión
function logout() {
    // Eliminar los datos del usuario actual
    localStorage.removeItem("currentUser");
    // Redirigir al inicio de sesión
    alert("Has cerrado sesión.");
    window.location.href = "login.html";
}
