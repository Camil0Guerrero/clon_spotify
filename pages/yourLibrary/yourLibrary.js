import { operations } from "../../assets/data.js";
import getData from "../../js/services/getData.js";
import setIcons from "../../js/services/setIcons.js";

let template = "",
	d = document;

export default async function yourLibrary() {
	// Top options
	let contentForHeader = `
		<a>Playlists</a>
		<a>Artists</a>
		<a>Albums</a>
		<a>Podcasts & Shows</a>
	`;

	d.querySelector(".core-content").innerHTML = contentForHeader;

	// When leaving a page, our element may remain with the class so as not to be seen
	d.querySelector(".core-content").classList.remove("none");

	// Requests needed for this page
	let resPlaylists = await getData(operations.playLists),
		[likedSongs, total] = await getData(operations.likedSongs),
		resMe = await getData(operations.me);

	let $container = d.querySelector(".container-playlists");

	const infoSongs = async () => {
		// When using a variable the "," it is not present in each loop
		let infoSong = "";
		likedSongs.map((el) => {
			infoSong += `<span>${el.track.artists[0].name} <span style="opacity: 0.7;">${el.track.name}</span> • </span>`;
		});
		return infoSong;
	};

	template = `
		<div class="card-liked-songs">
			<div class="songs">
				${await infoSongs()}
			</div>
			<h3>Liked Songs</h3>
			<p>${total} Liked songs</p>
			<button class="play center"></button>
		</div>
	`;

	resPlaylists.map((el) => {
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

	$container.innerHTML = template;

	setIcons();
}
