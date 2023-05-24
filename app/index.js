import App from "./App.js";
import Router from "./components/Router.js";

// Loaded
document.addEventListener("DOMContentLoaded", App);

// Click
document.addEventListener("click", async (e) => {
	// Home
	if (e.target.matches(".home") || e.target.matches(".home *")) {
		location.hash = "#/";
	}

	// Liked Songs
	if (e.target.matches(".liked-songs") || e.target.matches(".liked-songs *")) {
		location.hash = "#/liked-songs";
	}

	// Search
	if (e.target.matches(".search") || e.target.matches(".search *")) {
		location.hash = "#/search";
	}

	// Library
	if (e.target.matches(".library") || e.target.matches(".library *")) {
		location.hash = "#/your-library";
	}

	// Although our input is not in the entire element, we will make it assign the focus with the click
	if (e.target.matches(".inp-search") || e.target.matches(".inp-search *")) {
		d.querySelector(".inp-search input").focus();
	}
});

window.addEventListener("hashchange", () => {
	Router();
});
