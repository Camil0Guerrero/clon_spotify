import { operations } from "../../assets/data.js";
import button from "../../js/pruebas/button/button.js";
import getData from "../../js/services/getData.js";
import getToken from "../../js/services/getToken.js";

let template = "",
	d = document;

export default async function yourLibrary() {
	let [access_token] = getToken();

	let resPlaylists = await getData(operations.playLists, access_token),
		[likedSongs, total] = await getData(operations.likedSongs, access_token),
		resMe = await getData(operations.me, access_token);

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
}

// ${el.preview_url ? `<audio src="${el.preview_url}" id="${el.id}"></audio> ` : `<p> Sin Muestra </p>`}

d.addEventListener("click", (e) => {
	e.preventDefault();
	if (e.target.matches(".player-button") || e.target.matches(".player-button *")) {
		if (e.target.classList.contains("start")) {
			button(e.target.parentNode);
		} else if (e.target.matches("path")) {
			let svg = e.target.parentNode;
			button(svg.parentNode);
		} else {
			button(e.target);
		}
	}
});
