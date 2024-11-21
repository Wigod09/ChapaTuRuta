document.addEventListener("DOMContentLoaded", () => {
    const ticketsList = document.getElementById("tickets-list");

    // Recuperar tickets del localStorage
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];

    if (tickets.length === 0) {
        ticketsList.innerHTML = `
            <p style="text-align: center; color: #555; font-size: 14px;">
                No tienes tickets registrados. <br>
                ¡Reserva tu próximo viaje!
            </p>`;
    } else {
        // Generar dinámicamente la lista de tickets
        tickets.forEach((ticket, index) => {
            const ticketItem = document.createElement("div");
            ticketItem.classList.add("ticket-item");

            ticketItem.innerHTML = `
                <h3>Ticket ${index + 1}</h3>
                <p><strong>Origen:</strong> ${ticket.route.split(" - ")[0]}</p>
                <p><strong>Destino:</strong> ${ticket.route.split(" - ")[1]}</p>
                <p><strong>Precio:</strong> S/${ticket.price.toFixed(2)}</p>
            `;

            ticketsList.appendChild(ticketItem);
        });
    }
});

// Menú de navegación
const navigateTo = (page) => {
    window.location.href = `${page}.html`;
};

document.getElementById("home").addEventListener("click", () => navigateTo("principal"));
document.getElementById("route").addEventListener("click", () => navigateTo("ruta"));
document.getElementById("ticket").addEventListener("click", () => navigateTo("ticket"));
document.getElementById("payment").addEventListener("click", () => navigateTo("pago"));
document.getElementById("profile").addEventListener("click", () => navigateTo("perfil"));
