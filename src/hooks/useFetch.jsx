import getToken from "../helpers/getToken.js";
import Login from "../components/Login.js";
import { useEffect, useState } from "react";
import { endpoints } from "../assets/data.js";

let [access_token] = getToken();

export default function useFetch(endpoint, method = "GET") {
	const [data, setData] = useState(null);
	const [err, setErr] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		const fetchData = async () => {
			setLoading(true);

			try {
				const res = await fetch(endpoints.base + endpoint, {
					headers: {
						Authorization: `Bearer ${access_token}`,
						"Content-Type": "application/json",
					},
					method,
				});

				// Posibles errores
				// Possibles errors

				// Si el usuario no esta escuchando nada en Spotify devuelve este error
				// If the user is not listening to anything on Spotify, it returns this error
				if (res.status === 204) {
					setData({
						status: res.status,
						statusText: "The user is not listening to anything",
					});
					setErr(null);

					setLoading[false];
					return [data, err, loading];
				}

				// Si el token ha expirado o no hemos iniciado sesión devuelve este error, por lo que sera necesario volver a iniciar sesión
				// If the token is expired or we have not logged in, it returns this error, so it will be necessary to log in again
				if (res.status === 401) {
					Login();
				}

				// Si no podemos controlar el error se lo mostraremos al usuario
				// If not we can control the error we will show it to the user
				if (!res.ok) {
					let err = new Error("Error en la petición Fetch");
					err.status = res.status || "000";
					err.statusText = err.statusText || "Ocurrió un error";

					throw err;
				}

				const json = await res.json();

				if (!signal.aborted) {
					setData(json);
					setErr(null);
				}
			} catch (err) {
				if (!signal.aborted) {
					setData(null);
					setErr(err);
				}
			} finally {
				if (!signal.aborted) setLoading(false);
			}
		};

		fetchData();

		// Cuando el componente se desmonte se aborta la petición
		// When the component is unmounted, the request is aborted
		return () => abortController.abort();
	}, [endpoint]);

	return { data, err, loading };
}
