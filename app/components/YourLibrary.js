import { endpoints } from "../assets/data.js";
import FetchApi from "../helpers/FetchApi.js";

export default async function YourLibrary() {
	// Requests needed for this page
	const resPlayLists = await FetchApi(endpoints.playLists),
		resLikedSongs = await FetchApi(endpoints.likedSongs),
		resMe = await FetchApi(endpoints.me),
		playLists = resPlayLists.items,
		{ items: likedSongs, total } = resLikedSongs,
		// Top options
		contentForHeader = `
		<a>Playlists</a>
		<a>Artists</a>
		<a>Albums</a>
		<a>Podcasts & Shows</a>
	`,
		d = document;

	let template = "";

	d.querySelector(".core-content").innerHTML = contentForHeader;

	// When leaving a page, our element may remain with the class so as not to be seen
	d.querySelector(".core-content").classList.remove("none");

	const infoSongs = async () => {
		// When using a variable the "," it is not present in each loop
		let infoSong = "";
		likedSongs.map((el) => {
			infoSong += `<span>${el.track.artists[0].name} <span style="opacity: 0.7;">${el.track.name}</span> • </span>`;
		});
		return infoSong;
	};

	playLists.forEach((el) => {
		template += `
			<figure>
				<div class="container-img-figure">
					<img src="${el.images[0].url}" alt="${el.name}" />
					<button class="play center"></button>
				</div>
				<h4>${el.name}</h4>
				<p>By ${resMe.display_name}</p>
			</figure>
		`;
	});

	return `
	<h2>Playlists</h2>
	<div class="container-playlists">
		<div class="card-liked-songs">
			<div class="songs">
				${await infoSongs()}
			</div>
			<h3>Liked Songs</h3>
			<p>${total} Liked songs</p>
			<button class="play center"></button>
		</div>
		${template}
	</div>

	`;
}
