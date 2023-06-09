// This function will help us to take the code passed by the url, our account information and make the request to the Spotify API
const autenticateUser = async (
	spotyCode,
	client_id,
	client_secret,
	redirect_uri
) => {
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

		console.log(res, json);

		if (res.ok) {
			// When we get a success response, the information is saved in the localStorage
			localStorage.setItem("access_token", json.access_token);
			localStorage.setItem("refresh_token", json.refresh_token);
			window.location.href = redirect_uri;
		} else {
			throw { status: res.status, statusText: res.statusText };
		}
	} catch (err) {
		console.log(`Error en la petición del token`, err);
	}
};

export default function searchParams(client_id, client_secret, redirect_uri) {
	let urlParams = new URLSearchParams(location.search);
	const spotyCode = urlParams.get("code");

	if (spotyCode) {
		autenticateUser(spotyCode, client_id, client_secret, redirect_uri);
	}
}
