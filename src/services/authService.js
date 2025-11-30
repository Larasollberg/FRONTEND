import ENVIRONMENT from "../config/environment";
import { CONTENT_TYPE_VALUES, HEADERS, HTTP_METHODS } from "../constants/http";

export async function register(name, email, password) {
    try {
        const response_http = await fetch(
        `${ENVIRONMENT.URL_API}/api/auth/register`,
        {
            method: HTTP_METHODS.POST,
            headers: {
            [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
            },
            body: JSON.stringify({ name, email, password }),
        }
        );

        if (!response_http.ok) {
            // Intenta parsear como JSON, pero maneja si falla
            let errorMessage = 'Error interno del servidor';
            try {
                const errorData = await response_http.json();
                errorMessage = errorData.message || errorMessage;
            } catch (parseError) {
                // Si no es JSON, usa el status text o un mensaje genérico
                errorMessage = response_http.statusText || 'Error desconocido en el servidor';
            }
            throw new Error(errorMessage);
        }
        // Si ok, parsea la respuesta exitosa
        const response_data = await response_http.json();
        return response_data;
    } catch (error) {
        // Maneja errores de red
        if (error.message === "Failed to fetch" || error.name === "TypeError") {
            throw new Error("No se pudo conectar con el servidor. Verifica tu conexión a internet.");
        }
        // Relanza otros errores (e.g., del servidor)
        throw error;
    }
}

        /*const response_data = await response_http.json();

        if (!response_data.ok) {
        throw new Error(response_data.message);
        }

        return response_data;
    } catch (error) {
        if (error.message === "Failed to fetch") {
        throw new Error(
            "No se pudo conectar con el servidor"
        );
        }
        throw error;
    }
    }*/

    export async function login(email, password) {
    try {
        const response_http = await fetch(`${ENVIRONMENT.URL_API}/api/auth/login`, {
        method: HTTP_METHODS.POST,
        headers: {
            [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
        },
        body: JSON.stringify({ email, password }),
        });

        const response_data = await response_http.json();

        if (!response_data.ok) {
        throw new Error(response_data.message);
        }

        return response_data;
    } catch (error) {
        if (error.message === "Failed to fetch") {
        throw new Error(
            "No se pudo conectar con el servidor"
        );
        }
        throw error;
    }
    }

