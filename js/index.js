import jsHeader from "../pages/header/header.js";
import optionsUser from "./components/information-user/optionsUser.js";
import importFile from "./services/importFile.js";
import setIcons from "./services/setIcons.js";
import playLists from "./components/playLists/playlists.js";
import main from "../pages/main/main.js";
import likedSongs from "../pages/likedSongs/likedSongs.js";
import yourLibrary from "../pages/yourLibrary/yourLibrary.js";

const d = document;

d.addEventListener("DOMContentLoaded", async (e) => {
	const htmlHeader = await importFile("header"),
		htmlNavMenu = await importFile("navMenu"),
		htmlFooter = await importFile("footer"),
		htmlMain = await importFile("main");
	jsHeader();
	setIcons();

	setTimeout(() => {
		playLists();
		main();
	}, 300);

	d.querySelector("body").innerHTML = htmlHeader;
	d.querySelector("body").innerHTML += htmlNavMenu;
	d.querySelector("body").innerHTML += htmlMain;
	d.querySelector("body").innerHTML += htmlFooter;
});

d.addEventListener("click", async (e) => {
	e.preventDefault();
	optionsUser(e);

	if (e.target.matches(".liked-songs") || e.target.matches(".liked-songs *")) {
		const htmlTable = await importFile("likedSongs"),
			iconTimeTable = `
    		<svg role="img" height="16" width="16" viewBox="0 0 16 16" fill="currentColor">
     		  <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
     		  <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
				</svg>
 		 	`;

		d.querySelector("head").innerHTML += `<link rel="stylesheet" href="css/likedSongs.css" />`;
		d.querySelector("main").innerHTML = await htmlTable;
		d.querySelector(".time-icon").innerHTML = iconTimeTable;
		setIcons();

		likedSongs();
	}

	if (e.target.matches(".library") || e.target.matches(".library *")) {
		const htmlLibrary = await importFile("yourLibrary");

		d.querySelector("head").innerHTML += `<link rel="stylesheet" href="css/yourLibrary.css" />`;
		d.querySelector("main").innerHTML = htmlLibrary;

		yourLibrary();
	}
});
