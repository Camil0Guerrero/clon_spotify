import getToken from "./getToken.js";
import Login from "../components/Login.js";

let [access_token] = getToken();

export default async function FetchApi(endpoint, method = "GET") {
	try {
		const res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
			headers: {
				Authorization: `Bearer ${access_token}`,
				"Content-Type": "application/json",
			},
			method,
		});

		if (res.status === 204) return;
		// If it returns this error, it may be because our token has expired, so it is necessary to log in again
		else if (res.status === 401) Login();

		if (!res.ok) throw { status: res.status, statusText: res.statusText };

		// This state is when no songs are playing on Spotify

		return await res.json();
	} catch (err) {
		let message = err.statusText || "Ocurrió un error";
		document.querySelector("main").innerHTML = `Error al hacer fetching de datos: ${err}: ${message}`;
		console.log(err);
	}
}
