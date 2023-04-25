import data from "../assets/data.js";
import searchParams from "./services/searchParams.js";

const d = document;

// The scopes is necessary for get information
let spotify_url = `https://accounts.spotify.com/authorize?client_id=${data.client_id}&response_type=code&redirect_uri=${data.redirect_uri}&scope=${data.scope}`;

d.addEventListener("DOMContentLoaded", (e) => {
	searchParams(data.client_id, data.client_secret, data.redirect_uri);
});

d.addEventListener("click", (e) => {
	e.preventDefault();

	let buttonLogin = d.querySelector(".btn-login");
	if (e.target === buttonLogin) {
		window.location.replace(spotify_url);
	}
});
