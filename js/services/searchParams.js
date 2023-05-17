const autenticateUser = async (spotyCode, client_id, client_secret, redirect_uri) => {
	try {
		const searchParams = new URLSearchParams({
			code: spotyCode,
			grant_type: "authorization_code",
			redirect_uri,
			client_id,
			client_secret,
		});

		let res = await fetch("https://accounts.spotify.com/api/token", {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: searchParams,
			}),
			json = await res.json();

		if (res.ok) {
			localStorage.setItem("access_token", json.access_token);
			localStorage.setItem("refresh_token", json.refresh_token);
			window.location.href = `http://127.0.0.1:5500`;
		} else {
			throw { status: res.status, statusText: res.statusText };
		}
	} catch (err) {
		console.log(`Error en la peticion del token`, err);
	}
};

export default function searchParams(client_id, client_secret, redirect_uri) {
	let urlParams = new URLSearchParams(location.search);
	const spotyCode = urlParams.get("code");

	if (spotyCode) {
		autenticateUser(spotyCode, client_id, client_secret, redirect_uri);
	}
}
