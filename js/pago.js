document.addEventListener("DOMContentLoaded", () => {
    const selectedRoute = JSON.parse(localStorage.getItem("selectedRoute"));

    if (selectedRoute) {
        document.getElementById("route-origin").textContent = selectedRoute.route.split(" - ")[0];
        document.getElementById("route-destination").textContent = selectedRoute.route.split(" - ")[1];
        document.getElementById("route-price").textContent = `S/${selectedRoute.price.toFixed(2)}`;
    } else {
        document.querySelector(".payment-container").innerHTML = "<p>No se ha seleccionado ninguna ruta.</p>";
    }

    const confirmPaymentButton = document.getElementById("confirm-payment");
    const goBackButton = document.getElementById("go-back");
    const paymentFormContainer = document.getElementById("payment-form-container");
    const paymentForm = document.getElementById("payment-form");
    const cancelPaymentButton = document.getElementById("cancel-payment");

    // Mostrar formulario de pago
    confirmPaymentButton.addEventListener("click", () => {
        paymentFormContainer.classList.remove("hidden");
    });

    // Cancelar pago
    cancelPaymentButton.addEventListener("click", () => {
        paymentFormContainer.classList.add("hidden");
    });

    // Validar y procesar pago
    paymentForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const cardNumber = document.getElementById("card-number").value.trim();
        const cardHolder = document.getElementById("card-holder").value.trim();
        const expiryDate = document.getElementById("expiry-date").value.trim();
        const cvv = document.getElementById("cvv").value.trim();

        if (!/^\d{16}$/.test(cardNumber)) {
            alert("El número de tarjeta debe contener 16 dígitos.");
            return;
        }
        if (!/^[a-zA-Z\s]+$/.test(cardHolder)) {
            alert("El nombre del titular debe contener solo letras.");
            return;
        }
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            alert("La fecha de expiración debe tener el formato MM/AA.");
            return;
        }
        if (!/^\d{3}$/.test(cvv)) {
            alert("El CVV debe contener 3 dígitos.");
            return;
        }

        // Simulación de pago exitoso
        alert("Pago realizado con éxito.");
        localStorage.removeItem("selectedRoute");

        // Redirigir a ticket.html y almacenar ticket
        const ticket = { route: selectedRoute.route, price: selectedRoute.price };
        const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
        tickets.push(ticket);
        localStorage.setItem("tickets", JSON.stringify(tickets));

        window.location.href = "ticket.html";
    });

    // Navegación en el menú
    goBackButton.addEventListener("click", () => {
        window.location.href = "ruta.html";
    });

});

document.getElementById("home").addEventListener("click", () => window.location.href = "principal.html");
    document.getElementById("route").addEventListener("click", () => window.location.href = "ruta.html");
    document.getElementById("ticket").addEventListener("click", () => window.location.href = "ticket.html");
    document.getElementById("payment").addEventListener("click", () => window.location.href = "pago.html");
    document.getElementById("profile").addEventListener("click", () => window.location.href = "perfil.html");
