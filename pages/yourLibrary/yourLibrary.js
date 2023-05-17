import { operations } from "../../assets/data.js";
import getData from "../../js/services/getData.js";
import setIcons from "../../js/services/setIcons.js";

let template = "",
	d = document;

export default async function yourLibrary() {
	let contentForHeader = `
		<a href="">Playlists</a>
		<a href="">Artists</a>
		<a href="">Albums</a>
		<a href="">Podcasts & Shows </a>
	`;

	d.querySelector(".core-content").innerHTML = contentForHeader;
	d.querySelector(".core-content").classList.remove("none");

	let resPlaylists = await getData(operations.playLists),
		[likedSongs, total] = await getData(operations.likedSongs),
		resMe = await getData(operations.me);

	let $container = d.querySelector(".container-playlists");

	const infoSongs = async () => {
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
		$container.innerHTML = template;
	});

	setIcons();
}

// ${el.preview_url ? `<audio src="${el.preview_url}" id="${el.id}"></audio> ` : `<p> Sin Muestra </p>`}
