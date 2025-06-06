import axios from "axios"; // Importa la librería axios para realizar solicitudes HTTP

// Crea una instancia de axios con configuración predeterminada
const ApiDelivery = axios.create({
    baseURL: "http://localhost:8080/api", // Establece la URL base para las solicitudes API
    headers: {
        "Content-Type": "application/json", // Establece el tipo de contenido como JSON
    }
});

// Función para establecer el token de autenticación en las solicitudes
export const setAuthToken = (token: string | null) => {
    if (token) {
        // Si se proporciona un token, lo establece en los encabezados de las solicitudes
        ApiDelivery.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        // Si no se proporciona un token, elimina el encabezado de autorización
        delete ApiDelivery.defaults.headers.common["Authorization"];
    }
};

// Exporta la instancia de ApiDelivery para su uso en otras partes de la aplicación
export { ApiDelivery };
