import { data } from "../assets/data.js";
import searchParams from "../helpers/searchParams.js";

export default async function Login() {
	const d = document;

	let $style = d.createElement("style");
	$style.innerHTML = `
		html{
			background-color: #fff;
			padding: 1rem;
		}
	`;

	d.querySelector("head").appendChild($style);

	// The scopes is necessary for get information
	let urlSpotify = `https://accounts.spotify.com/authorize?client_id=${data.client_id}&response_type=code&redirect_uri=${data.redirect_uri}&scope=${data.scope}`;
	d.querySelector("body").innerHTML =
		"<button class='btn-login'>Inicia sesión</button>";

	d.addEventListener("click", e => {
		e.preventDefault();
		let $buttonLogin = d.querySelector(".btn-login");

		if (e.target === $buttonLogin) {
			window.location.replace(urlSpotify);
		}
	});

	searchParams(data.client_id, data.client_secret, data.redirect_uri);
}
