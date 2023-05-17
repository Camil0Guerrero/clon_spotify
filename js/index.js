import jsHeader from "../pages/header/header.js";
import optionsUser from "./components/information-user/optionsUser.js";
import importFile from "./services/importFile.js";
import setIcons from "./services/setIcons.js";
import playLists from "./components/playLists/playlists.js";
import main from "../pages/main/main.js";
import likedSongs from "../pages/likedSongs/likedSongs.js";
import yourLibrary from "../pages/yourLibrary/yourLibrary.js";
import search from "../pages/search/search.js";
import removeStyles from "./services/removeStyles.js";
import device from "./device.js";

const d = document;

// Loaded
d.addEventListener("DOMContentLoaded", async () => {
	setTimeout(() => {
		setIcons();
		setTimeout(() => {
			device();
		}, 1000);
	}, 3000);
});

d.addEventListener("readystatechange", async () => {
	const htmlHead = await importFile("head"),
		htmlHeader = await importFile("header"),
		htmlNavMenu = await importFile("navMenu"),
		htmlFooter = await importFile("footer"),
		htmlMain = await importFile("main");

	jsHeader();

	setTimeout(() => {
		playLists();
		main();
	}, 300);

	d.querySelector("html").innerHTML = htmlHead;
	d.querySelector("body").innerHTML = htmlHeader;
	d.querySelector("body").innerHTML += htmlNavMenu;
	d.querySelector("body").innerHTML += `<main>${htmlMain}</main>`;
	d.querySelector("body").innerHTML += htmlFooter;

	// setIcons();
});

// Click
d.addEventListener("click", async (e) => {
	e.preventDefault();
	e.stopPropagation();
	optionsUser(e);

	// Home
	if (e.target.matches(".home") || e.target.matches(".home *")) {
		removeStyles();

		d.querySelector(".core-content").innerHTML = "";

		const htmlMain = await importFile("main");

		d.querySelector("main").innerHTML = htmlMain;
		main();
		setIcons();
	}

	// Liked Songs
	if (e.target.matches(".liked-songs") || e.target.matches(".liked-songs *")) {
		removeStyles();
		const htmlTable = await importFile("likedSongs"),
			iconTimeTable = `
    		<svg role="img" height="16" width="16" viewBox="0 0 16 16" fill="currentColor">
     		  <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
     		  <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
				</svg>
 		 	`;

		if (!d.querySelector(`link[href*="liked"]`)) {
			let styleLine = `<link rel="stylesheet" href="css/likedSongs.css" />`;
			d.querySelector("head").innerHTML += styleLine;
		}

		d.querySelector("main").innerHTML = await htmlTable;
		d.querySelector(".time-icon").innerHTML = iconTimeTable;
		setIcons();

		likedSongs();
	}

	// Search
	if (e.target.matches(".search") || e.target.matches(".search *")) {
		removeStyles();
		const htmlSearch = await importFile("search");

		if (!d.querySelector(`link[href*="search"]`)) {
			let styleLine = `<link rel="stylesheet" href="css/search.css" />`;
			d.querySelector("head").innerHTML += styleLine;
		}

		d.querySelector("main").innerHTML = htmlSearch;

		search();
	}

	// Library
	if (e.target.matches(".library") || e.target.matches(".library *")) {
		removeStyles();
		const htmlLibrary = await importFile("yourLibrary");

		if (!d.querySelector(`link[href*="your"]`)) {
			let styleLine = `<link rel="stylesheet" href="css/yourLibrary.css" />`;
			d.querySelector("head").innerHTML += styleLine;
		}

		d.querySelector("main").innerHTML = htmlLibrary;

		yourLibrary();
	}
});
