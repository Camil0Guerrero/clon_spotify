import setIcons from "../helpers/setIcons.js";
import Head from "./Head.js";
import LikedSongs from "./LikedSongs.js";
import Main from "./Main.js";
import Search from "./Search.js";
import YourLibrary from "./YourLibrary.js";
import searchParams from "../helpers/searchParams.js";

export default async function Router() {
	const d = document,
		{ hash } = location;

	// Navigation
	switch (hash) {
		// Home
		case !hash || "#/":
			searchParams();
			d.querySelector(".core-content").innerHTML = "";

			d.querySelector("main").innerHTML = await Main();
			d.querySelector("head").innerHTML = Head(`Clon Spotify`, "");

			setIcons();
			return "";

		// Liked Songs
		case "#/liked-songs":
			if (d.querySelector(`link[href*="liked"]`)) return;

			const iconTimeTable = `
    	<svg role="img" height="16" width="16" viewBox="0 0 16 16" fill="currentColor">
    	  <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
   		  <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
			</svg>
 		 	`;

			d.querySelector("head").innerHTML = Head(`Liked Songs`, `likedSongs`);

			d.querySelector("main").innerHTML = await LikedSongs();
			d.querySelector(".time-icon").innerHTML = iconTimeTable;
			setIcons();
			return "likedSongs";

		// Search
		case "#/search":
			if (d.querySelector("link[href*='search']")) return;

			d.querySelector("head").innerHTML = Head(`Search`, `search`);
			d.querySelector("main").innerHTML = await Search();

			return "search";

		// Your Library
		case "#/your-library":
			if (d.querySelector("link[href*='your']")) return;

			d.querySelector("head").innerHTML = Head("Your Library", "yourLibrary");
			d.querySelector("main").innerHTML = await YourLibrary();

			return "yourLibrary";

		default:
			break;
	}
}
