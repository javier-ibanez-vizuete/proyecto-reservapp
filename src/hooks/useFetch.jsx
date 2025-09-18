import { useEffect, useState } from "react";

export const useFetch = (url = "") => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Función base para hacer cualquier petición
    const makeFetch = async (requestUrl, options = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(requestUrl, {
                headers: {
                    "Content-Type": "application/json",
                },
                ...options,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json();
            setData(result);
            return result;
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // GET - Obtener datos
    const get = (requestUrl = url) => {
        return makeFetch(requestUrl, { method: "GET" });
    };

    // POST - Crear nuevo
    const post = (requestUrl = url, body) => {
        return makeFetch(requestUrl, {
            method: "POST",
            body: JSON.stringify(body),
        });
    };

    // PUT - Actualizar
    const put = (requestUrl = url, body) => {
        return makeFetch(requestUrl, {
            method: "PUT",
            body: JSON.stringify(body),
        });
    };

    // DELETE - Eliminar
    const remove = (requestUrl = url) => {
        return makeFetch(requestUrl, { method: "DELETE" });
    };

    // Auto-ejecutar GET si hay URL
    useEffect(() => {
        if (url) {
            get();
        }
    }, [url]);

    return {
        data,
        loading,
        error,
        get,
        post,
        put,
        remove,
    };
};
