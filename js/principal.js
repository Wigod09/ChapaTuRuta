document.addEventListener("DOMContentLoaded", () => {
    let destinationMarker;
    let currentMarker;

    // Configuración del mapa
    const map = L.map("map").setView([-8.1116, -79.0288], 13); // Coordenadas iniciales por defecto

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '@Designed for trujillo',
    }).addTo(map);

    // Obtener y usar la ubicación actual del usuario
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const userCoords = [latitude, longitude];

                // Centrar el mapa en la ubicación actual
                map.setView(userCoords, 13);

                // Agregar marcador para la ubicación actual
                const userMarker = L.marker(userCoords).addTo(map);
                userMarker.bindPopup("Tú estás aquí").openPopup();
                // Añadir micros ficticios cerca de la ubicación actual 
                addRandomMicros(userCoords, 5, 100);
                addRandomMicrosTwo(userCoords, 5, 200);
                addRandomMicrosThree(userCoords, 5, 300);
            },
            (error) => {
                console.error("Error obteniendo la ubicación:", error.message);
                alert("No se pudo obtener la ubicación actual. Verifica los permisos de tu navegador.");
            }
        );
        
    } else {
        alert("La geolocalización no es soportada en este navegador.");
    }

    // Añadir un marcador de destino
const redIcon = L.icon({
    iconUrl: '../img/icon-gps-red.png',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [1, -36],
});

map.on('click', function (e) {
    // Preguntar al usuario si quiere marcar o guardar el destino
    const userChoice = confirm("¿Deseas marcar este lugar como destino o guardarlo? \nAceptar para marcar como destino. \nCancelar para guardar destino.");
    
    if (userChoice) {
        // Usuario eligió marcar como destino
        // Eliminar el marcador existente si hay uno
        if (destinationMarker) {
            map.removeLayer(destinationMarker);
            destinationMarker = null;
        }

        // Crear un nuevo marcador en la ubicación del clic
        destinationMarker = L.marker(e.latlng, { icon: redIcon }).addTo(map)
            .bindPopup("Destino seleccionado")
            .openPopup();

        // Añadir evento de clic para eliminar el marcador
        destinationMarker.on('click', function () {
            map.removeLayer(destinationMarker);
            destinationMarker = null;
        });
    } else {
        // Usuario eligió guardar el destino
        const destinationName = prompt("Ingresa un nombre para guardar este destino:");
        if (destinationName) {
            // Guardar las coordenadas en locationCoords
            const coords = [e.latlng.lat, e.latlng.lng];
            if (!locationCoords[destinationName]) {
                locationCoords[destinationName] = coords;
                alert(`Destino "${destinationName}" guardado con éxito.`);
            } else {
                alert(`El destino "${destinationName}" ya existe.`);
            }

            // Crear y registrar un nuevo elemento en la lista de destinos
            const newLocation = document.createElement("span");
            newLocation.className = "location";
            newLocation.innerHTML = `${destinationName} <button class="delete">❌</button>`;
            savedLocations.appendChild(newLocation);
            registerLocationEvents(newLocation);
        } else {
            alert("No se guardó el destino porque no se proporcionó un nombre.");
        }
    }
});

// Objeto para almacenar los destinos guardados y sus coordenadas
const savedLocationsData = {};

// Actualización de la función `getCoordinatesForLocation` para usar los datos guardados dinámicamente
function getCoordinatesForLocation(locationName) {
    return savedLocationsData[locationName] || null;
}


    function getRandomCoords(center, radius) {
        const y0 = center[0];
        const x0 = center[1];
        const rd = radius / 111300; // Convertir a grados
        const u = Math.random();
        const v = Math.random();
        const w = rd * Math.sqrt(u);
        const t = 2 * Math.PI * v;
        const x = w * Math.cos(t);
        const y = w * Math.sin(t);
        const newX = x + x0;
        const newY = y + y0;
        return [newY, newX];
    }

    // Definir el icono personalizado para los micros 
    const busIcon = L.icon({ iconUrl: '../img/bus-map.png',
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [1, -36],
    });

    const busIconGreen = L.icon({ iconUrl: '../img/bus-icon-green.png',
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [1, -36],
    });

    const busIconBlue = L.icon({ iconUrl: '../img/bus-icon-blue.png',
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [1, -36],
    });

    const PorvenirCoords = [-8.10227, -79.0231];
    const UCVs = [-8.12945, -79.04363889];
    const TrujillosCoords = [-8.1111, -79.0289];
    const PlazaDeArmas = [-8.1132, -79.0305];
    const HospitalDeLarcoHerrera = [-8.1202, -79.0321];
    const ParqueDeLaCultura = [-8.1155, -79.0278];
    const HuanchacoBeach = [-8.1073, -79.0456]; 
    const MuseoCiudadTrujillo = [-8.1119, -79.0292]; 
    const EstadioMansiche = [-8.1103, -79.0275]; 
    const MercadoModelo = [-8.1178, -79.0333];

    // Llamar a la función para añadir micros en El Porvenir
    addRandomMicros(PorvenirCoords, 4, 150);
    addRandomMicrosTwo(PorvenirCoords, 2, 180);
    addRandomMicrosThree(PorvenirCoords, 1, 200);
    //--------------------------------------------//
    addRandomMicros(UCVs, 3, 115);
    addRandomMicrosTwo(UCVs, 2, 130);
    addRandomMicrosThree(UCVs, 1, 150);
    //--------------------------------------------//
    addRandomMicros(TrujillosCoords, 3, 140);
    addRandomMicrosTwo(TrujillosCoords, 2, 160);
    addRandomMicrosThree(TrujillosCoords, 1, 180);
    //--------------------------------------------//
    addRandomMicros(PlazaDeArmas, 5, 100);
    addRandomMicrosTwo(PlazaDeArmas, 3, 120);
    addRandomMicrosThree(PlazaDeArmas, 2, 140);
    //--------------------------------------------//
    addRandomMicros(HospitalDeLarcoHerrera, 4, 220);
    addRandomMicrosTwo(HospitalDeLarcoHerrera, 2, 240);
    addRandomMicrosThree(HospitalDeLarcoHerrera, 1, 260);
    //--------------------------------------------//
    addRandomMicros(ParqueDeLaCultura, 2, 620);
    addRandomMicrosTwo(ParqueDeLaCultura, 1, 640);
    addRandomMicrosThree(ParqueDeLaCultura, 1, 660);
    //--------------------------------------------//
    addRandomMicros(HuanchacoBeach, 4, 120);
    addRandomMicrosTwo(HuanchacoBeach, 2, 140);
    addRandomMicrosThree(HuanchacoBeach, 1, 160);
    //--------------------------------------------//
    addRandomMicros(MuseoCiudadTrujillo, 2, 520);
    addRandomMicrosTwo(MuseoCiudadTrujillo, 1, 540);
    addRandomMicrosThree(MuseoCiudadTrujillo, 1, 560);
    //--------------------------------------------//
    addRandomMicros(EstadioMansiche, 2, 620);
    addRandomMicrosTwo(EstadioMansiche, 1, 640);
    addRandomMicrosThree(EstadioMansiche, 1, 660);
    //--------------------------------------------//
    addRandomMicros(MercadoModelo, 5, 520);
    addRandomMicrosTwo(MercadoModelo, 3, 540);
    addRandomMicrosThree(MercadoModelo, 2, 560);
    //--------------------------------------------//
    
    function addRandomMicros(centerCoords, count, radius) {
        for (let i = 0; i < count; i++) {
            const randomCoords = getRandomCoords(centerCoords, radius);
            const marker = L.marker(randomCoords, { icon: busIcon }).addTo(map);
            marker.bindPopup("Micro Linea 245");
        }
    }

    function addRandomMicrosTwo(centerCoords, count, radius) {
        for (let i = 0; i < count; i++) {
            const randomCoords = getRandomCoords(centerCoords, radius);
            const marker = L.marker(randomCoords, { icon: busIconGreen }).addTo(map);
            marker.bindPopup("Micro Linea 345");
        }
    }

    function addRandomMicrosThree(centerCoords, count, radius) {
        for (let i = 0; i < count; i++) {
            const randomCoords = getRandomCoords(centerCoords, radius);
            const marker = L.marker(randomCoords, { icon: busIconBlue }).addTo(map);
            marker.bindPopup("Micro Linea 445");
        }
    }
    
    
    // Manejo de ubicaciones guardadas
    const savedLocations = document.querySelector(".saved-locations");
    const addDestinationButton = document.getElementById("addDestination");
    const destinationInput = document.getElementById("destination");

    // Función para centrar el mapa
    function centerMapOnLocation(locationName, coords) { 
        // Eliminar el marcador existente si hay uno 
        if (currentMarker) { 
            map.removeLayer(currentMarker); 
        } map.setView(coords, 15); 
        // Centrar y hacer zoom en la ubicación 
        currentMarker = L.marker(coords).addTo(map).bindPopup(locationName).openPopup(); 
    }

    // Registrar eventos en ubicaciones preexistentes
    function registerLocationEvents(locationElement) {
        const locationName = locationElement.childNodes[0].nodeValue.trim(); // Obtener solo el texto del elemento

        // Evento para centrar el mapa
        locationElement.addEventListener("click", () => {
            const coords = getCoordinatesForLocation(locationName);
            if (coords) {
                centerMapOnLocation(locationName, coords);
            } else {
                alert(`No se encontraron coordenadas para "${locationName}".`);
            }
        });

        // Evento para eliminar
        locationElement.querySelector(".delete").addEventListener("click", (e) => {
            e.stopPropagation(); // Evitar que el evento de clic del mapa también se dispare
            savedLocations.removeChild(locationElement);
        });
    }

    // Coordenadas según los nombres
    let locationCoords = {
        "UCV": [-8.12945, -79.04363889],
        "Trujillo": [-8.1111, -79.0289], 
        "Plaza de Armas": [-8.1132, -79.0305], 
        "Hospital Víctor Larco Herrera": [-8.1202, -79.0321], 
        "Parque de la Cultura": [-8.1155, -79.0278], 
        "Huanchaco Beach": [-8.1073, -79.0456], 
        "Museo de la Ciudad de Trujillo": [-8.1119, -79.0292], 
        "Estadio Mansiche": [-8.1103, -79.0275], 
        "Mercado Modelo": [-8.1178, -79.0333]
    };

    // Actualizar la función para usar el objeto global modificado
    function getCoordinatesForLocation(locationName) {
        return locationCoords[locationName] || null;
    }

    // Inicializar eventos para ubicaciones existentes
    document.querySelectorAll(".saved-locations .location").forEach(registerLocationEvents);

    // Agregar nuevas ubicaciones
    addDestinationButton.addEventListener("click", () => {
        const newDestination = destinationInput.value.trim();
        if (newDestination) {
            // Crear nueva ubicación
            const newLocation = document.createElement("span");
            newLocation.className = "location";
            newLocation.innerHTML = `${newDestination} <button class="delete">❌</button>`;
            savedLocations.appendChild(newLocation);
            destinationInput.value = "";

            // Registrar eventos para la nueva ubicación
            registerLocationEvents(newLocation);
        }
    });

    document.getElementById("home").addEventListener("click", () => window.location.href = "principal.html");
    document.getElementById("route").addEventListener("click", () => window.location.href = "ruta.html");
    document.getElementById("ticket").addEventListener("click", () => window.location.href = "ticket.html");
    document.getElementById("payment").addEventListener("click", () => window.location.href = "pago.html");
    document.getElementById("profile").addEventListener("click", () => window.location.href = "perfil.html");
});
