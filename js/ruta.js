document.addEventListener("DOMContentLoaded", () => {
    // Funcionalidad del botón de retroceso
    document.querySelector(".back-btn").addEventListener("click", () => {
        window.history.back(); // Regresa a la página anterior
    });

    // Inputs de localización y switch para intercambiar valores
    const locationInputs = document.querySelectorAll(".location-btn"); // Inputs de ubicación
    const switchIcon = document.querySelector(".switch-icon"); // Icono de intercambio

    // Función para intercambiar valores y placeholders de los inputs
    const switchLocations = () => {
        const tempValue = locationInputs[0].value;
        locationInputs[0].value = locationInputs[1].value;
        locationInputs[1].value = tempValue;

        const tempPlaceholder = locationInputs[0].placeholder;
        locationInputs[0].placeholder = locationInputs[1].placeholder;
        locationInputs[1].placeholder = tempPlaceholder;
    };

    // Evento para el icono de intercambio
    switchIcon.addEventListener("click", switchLocations);

    // Generar rutas dinámicas basadas en la hora actual
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    const routes = [
        {
            type: "recommended",
            startTime: formatTime(currentHour, currentMinutes + 2), // Sale en 2 minutos
            endTime: formatTime(currentHour, currentMinutes + 15), // Llega en 15 minutos
            price: 1.0,
            route: "Centro Histórico → Florencia de Mora",
            walkTime: "3 min",
            busNumber: 245,
        },
        {
            type: "other",
            startTime: formatTime(currentHour, currentMinutes + 8), // Sale en 8 minutos
            endTime: formatTime(currentHour, currentMinutes + 22), // Llega en 22 minutos
            price: 1.2,
            route: "Real Plaza Trujillo → El Porvenir",
            walkTime: "4 min",
            busNumber: 245,
        },
        {
            type: "other",
            startTime: formatTime(currentHour, currentMinutes + 12), // Sale en 12 minutos
            endTime: formatTime(currentHour, currentMinutes + 30), // Llega en 30 minutos
            price: 1.3,
            route: "La Esperanza → Mall Aventura Plaza",
            walkTime: "5 min",
            busNumber: 345,
        },
        {
            type: "other",
            startTime: formatTime(currentHour, currentMinutes + 18), // Sale en 18 minutos
            endTime: formatTime(currentHour, currentMinutes + 45), // Llega en 45 minutos
            price: 1.5,
            route: "Terminal Santa Cruz → Av. Mansiche",
            walkTime: "6 min",
            busNumber: 345,
        },
        {
            type: "other",
            startTime: formatTime(currentHour, currentMinutes + 25), // Sale en 25 minutos
            endTime: formatTime(currentHour, currentMinutes + 50), // Llega en 50 minutos
            price: 1.6,
            route: "Universidad Nacional de Trujillo → Huanchaco",
            walkTime: "8 min",
            busNumber: 445,
        },
    ];
    

    const recommendedRoutesContainer = document.getElementById("recommended-routes");
    const otherRoutesContainer = document.getElementById("other-routes");
    const selectedOption = document.getElementById("selected-option");

    const dropdownMenu = document.querySelector(".dropdown-menu");
    const optionButton = document.querySelector(".option-btn");

    // Mostrar y ocultar el menú desplegable
    optionButton.addEventListener("click", () => {
        dropdownMenu.classList.toggle("hidden");
    });

    // Filtrar rutas según la opción seleccionada
    dropdownMenu.addEventListener("click", (e) => {
        if (e.target.classList.contains("dropdown-item")) {
            const filter = e.target.textContent.trim();
            selectedOption.textContent = filter;
            dropdownMenu.classList.add("hidden");
            filterRoutes(filter);
        }
    });

    // Función para filtrar rutas
    function filterRoutes(filter) {
        // Limpiar los contenedores de rutas
        recommendedRoutesContainer.innerHTML = "";
        otherRoutesContainer.innerHTML = "";

        const now = new Date();

        // Filtrar las rutas según el tiempo seleccionado
        const filteredRoutes = routes.filter((route) => {
            const [startHour, startMinutes] = route.startTime.split(":").map(Number);

            const routeTime = new Date();
            routeTime.setHours(startHour, startMinutes, 0, 0);

            const timeDifferenceInMinutes = (routeTime - now) / (1000 * 60);

            if (filter === "Sale ahora") {
                return timeDifferenceInMinutes <= 5 && timeDifferenceInMinutes >= 0;
            } else if (filter === "En 15 minutos") {
                return timeDifferenceInMinutes > 0 && timeDifferenceInMinutes <= 15;
            } else if (filter === "En 30 minutos") {
                return timeDifferenceInMinutes > 0 && timeDifferenceInMinutes <= 30;
            } else if (filter === "En 1 hora") {
                return timeDifferenceInMinutes > 0 && timeDifferenceInMinutes <= 60;
            }

            return false;
        });

        renderRoutes(filteredRoutes);
    }

    // Función para renderizar las rutas filtradas
    function renderRoutes(filteredRoutes) {
        filteredRoutes.forEach((route) => {
            const routeElement = document.createElement("div");
            routeElement.classList.add("route");
    
            routeElement.innerHTML = `
                <div class="route-container">
                    <div class="route-info">
                        <p>${route.startTime} - ${route.endTime}</p>
                        <p>Precio: S/${route.price.toFixed(2)}</p>
                        <p>${route.route}</p>
                    </div>
                    <div class="route-details">
                        <p>🚶 ${route.walkTime}</p>
                        <p>🚌 ${route.busNumber}</p>
                    </div>
                </div>
                <button class="btn-select-route">Seleccionar</button>
            `;
    
            // Agregar evento al botón
            const selectButton = routeElement.querySelector(".btn-select-route");
            selectButton.addEventListener("click", () => {
                // Guardar información en localStorage
                localStorage.setItem("selectedRoute", JSON.stringify(route));
    
                // Redirigir a la página de pago
                window.location.href = "pago.html";
            });
    
            if (route.type === "recommended") {
                recommendedRoutesContainer.appendChild(routeElement);
            } else {
                otherRoutesContainer.appendChild(routeElement);
            }
        });
    
        // Mostrar mensaje si no hay rutas disponibles
        if (filteredRoutes.length === 0) {
            const emptyMessage = document.createElement("p");
            emptyMessage.textContent = "No hay rutas disponibles.";
            recommendedRoutesContainer.appendChild(emptyMessage);
        }
    
        if (!otherRoutesContainer.hasChildNodes()) {
            const emptyMessage = document.createElement("p");
            emptyMessage.textContent = "No hay otras rutas disponibles.";
            otherRoutesContainer.appendChild(emptyMessage);
        }
    }
    

    // Filtrar rutas al cargar la página con el filtro "Sale ahora"
    filterRoutes("Sale ahora");

    // Navegación entre páginas
    document.getElementById("home").addEventListener("click", () => window.location.href = "principal.html");
    document.getElementById("route").addEventListener("click", () => window.location.href = "ruta.html");
    document.getElementById("ticket").addEventListener("click", () => window.location.href = "ticket.html");
    document.getElementById("payment").addEventListener("click", () => window.location.href = "pago.html");
    document.getElementById("profile").addEventListener("click", () => window.location.href = "perfil.html");
});

// Función para formatear la hora en formato "HH:MM"
function formatTime(hour, minutes) {
    hour += Math.floor(minutes / 60); // Ajustar la hora si los minutos exceden 60
    minutes %= 60; // Obtener los minutos restantes
    hour %= 24; // Ajustar la hora para que esté en formato 24h
    return `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}
