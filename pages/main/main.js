import { operations } from "../../assets/data.js";
import button from "../../js/components/button.js";
import getData from "../../js/services/getData.js";
import footer from "../footer/footer.js";

async function getTitle() {
	// Show a different greeting depending on the time of day
	let today = new Date(),
		time = today.toLocaleTimeString(),
		hour = time.slice(0, 2),
		template = "";

	if (hour >= 0 && hour < 12) {
		template = `Good Morning`;
	} else if (hour >= 12 && hour <= 19) {
		template = `Good Afternoon`;
	} else {
		template = `Good Night`;
	}

	return await template;
}

export default async function main(d = document) {
	const title = d.querySelector(".title-main"),
		playlists = await getData(operations.playLists);

	// It's the only icon I need in this file so I don't import all of them
	let likedSongs = `
		<div>
			<img src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png" alt="Image of liked song" />

			<div class="content-card">
				<p>Liked Songs</p>
				<button class="play center"></button>
			</div>
		</div>
	`,
		template = "",
		templateArtists = "",
		templateSongs = "";

	// We add the greeting
	title.innerHTML = await getTitle();

	// Since I only need 5 playlists and a limit cannot be added in the request, I use the for loop
	for (let i = 0; i < 5; i++) {
		const el = playlists[i];
		template += `
			<div>
				<img src="${el.images[0].url}" alt="Image of the playlist named ${el.name}" />

				<div class="content-card">
					<p>${el.name}</p>
					<button class="play center"></button>
				</div>
			</div>
		`;
	}

	d.querySelector(".cards").innerHTML = likedSongs;
	d.querySelector(".cards").innerHTML += template;

	// Request for artists, songs and adding their content in a variable

	let meArtists = await getData(operations.meArtists, 7),
		resSongs = await getData(operations.meSongs, 5);

	meArtists.map((el) => {
		templateArtists += `
      <figure>
        <img src="${el.images[0].url}" alt="${el.name}" />
        <h4>${el.name}</h4>
        <p>Artist</p>
      </figure>
    `;
	});

	resSongs.map((el) => {
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

	// ${el.preview_url ? `<audio src="${el.preview_url}" id="${el.id}"></audio> ` : `<p> Sin Muestra </p>`}

	// Adding content to the DOM
	d.querySelector(".recommendations").innerHTML = `
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
    `;

	d.addEventListener("click", (e) => {
		e.preventDefault();
		// Depending on where the user clicks, we must go through the elements to reach the button that has the id

		// After getting the information, it will send it to their respective functions to display the information and add the functionality.

		if (e.target.matches(".play") || e.target.matches(".play *")) {
			if (e.target.classList.contains("start")) {
				//
				let idSong = e.target.parentNode.dataset.id;
				let informationSong = resSongs.filter((el) => {
					return el.id == idSong;
				});

				footer(informationSong);
				button(e.target.parentNode);
			} else if (e.target.matches("path")) {
				//
				let svg = e.target.parentNode,
					idSong = svg.parentNode.dataset.id;
				const informationSong = resSongs.filter((el) => {
					return el.id === idSong;
				});
				footer(informationSong);
				button(svg.parentNode);
			} else {
				//
				let idSong = e.target.dataset.id,
					informationSong = resSongs.filter((el) => {
						return el.id == idSong;
					});
				footer(informationSong);
				button(e.target);
			}
		}
	});
}
