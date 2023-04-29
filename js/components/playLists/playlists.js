import getData from "../../services/getData.js";
import getToken from "../../services/getToken.js";

const d = document,
	$prueba = d.querySelector(".prueba");

let template = "";

d.addEventListener("DOMContentLoaded", async (e) => {
	let [access_token] = getToken();
	let resArtist = await getData("playlists", access_token);
	console.log(resArtist);

	let $title = resArtist.length > 1 ? `<h2>PlayLists</h2>` : `<h2>Playlist</h2>`;

	resArtist.map((el) => {
		template += `
    <a href="${el.tracks.href}">
      <img src="${el.images[0].url}" alt="${el.name}" />
      <p>${el.name} </p>
    </a>
    `;
	});

	$prueba.innerHTML = `
    ${$title}
    <article class="playlists">
      ${template}
    </article>
    `;
});
