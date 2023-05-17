import getData from "../../services/getData.js";
import { operations } from "../../../assets/data.js";

export default async function playLists(d = document) {
	let $playLists = d.querySelector(".playlists"),
		template = "";
	let resArtist = await getData(operations.playLists);

	resArtist.map((el) => {
		template += `
    <a href="${el.tracks.href}">
      <img src="${el.images[0].url}" alt="${el.name}" />
      <p>${el.name} </p>
    </a>
    `;
	});

	$playLists.innerHTML = `
    <article class="playlists">
      ${template}
    </article>
    `;
}
