import button from "../helpers/button.js";
import { endpoints } from "../assets/data.js";
import FetchApi from "../helpers/FetchApi.js";
import Footer from "./Footer.js";
import Title from "./Title.js";

export default async function Main() {
	// Request for artists, songs and adding their content in a variable
	const resPlaylists = await FetchApi(endpoints.playLists),
		resArtists = await FetchApi(endpoints.meArtists),
		resSongs = await FetchApi(endpoints.meSongs),
		playlists = resPlaylists.items,
		artists = resArtists.items,
		songs = resSongs.items;

	let favoritePlaylists = "",
		templateArtists = "",
		templateSongs = "";

	// Since I only need 5 playlists and a limit cannot be added in the request, I use the for loop
	for (let i = 0; i < 5; i++) {
		const el = playlists[i];
		favoritePlaylists += `
			<div>
				<img src="${el.images[0].url}" alt="Image of the playlist named ${el.name}" />

				<div class="content-card">
					<p>${el.name}</p>
					<button class="play center"></button>
				</div>
			</div>
		`;
	}

	artists.forEach((el) => {
		templateArtists += `
      <figure>
        <img src="${el.images[0].url}" alt="${el.name}" />
        <h4>${el.name}</h4>
        <p>Artist</p>
      </figure>
    `;
	});

	songs.forEach((el) => {
		templateSongs += `
      <figure>
				<div class="container-img-figure">
					<img src="${el.album.images[0].url}" alt="${el.name}" />

					<button class="play center" data-id="${el.id}"></button>
				</div>
				
        <h4>${el.name}</h4>
        <p>${el.artists[0].name}</p>
			</figure>
		`;
	});

	document.addEventListener("click", async (e) => {
		e.preventDefault();
		// Depending on where the user clicks, we must go through the elements to reach the button that has the id

		// After getting the information, it will send it to their respective functions to display the information and add the functionality.

		if (e.target.matches(".play") || e.target.matches(".play *")) {
			let id, informationSong;

			if (e.target.classList.contains("start")) {
				id = e.target.parentNode.dataset.id;
				informationSong = resSongs.filter((el) => {
					return el.id === id;
				});
			} else if (e.target.matches("path")) {
				let svg = e.target.parentNode;

				id = svg.parentNode.dataset.id;
				informationSong = songs.filter((el) => {
					return el.id === id;
				});
			} else {
				id = e.target.dataset.id;
				informationSong = songs.filter((el) => {
					return el.id === id;
				});
			}

			document.querySelector("footer").innerHTML = Footer(informationSong[0]);
			setTimeout(() => {
				button(id);
			}, 100);
		}
	});

	return `
		<h2 class="title-main">${Title()}</h2>
		<article class="recently-heard">
			<aside class="cards">
				<div>
					<img src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png" alt="Image of liked song" />

					<div class="content-card">
						<p>Liked Songs</p>
						<button class="play center"></button>
					</div>
				</div>

				${favoritePlaylists}
			</aside>
		</article>

		<h2>Made for Camilo Guerrero</h2>
		<article class="recommendations">
			<h3>Your Artists</h3>
			<div class="container-section">
				<div class="section">
					${templateArtists} 
				</div>
			</div>

			<h3>Your Songs</h3>
			<div class="container-section">
				<div class="section">
					${templateSongs}
				</div>
			</div>
		</article>
	`;
}
