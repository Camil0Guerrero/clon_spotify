import { endpoints } from "../assets/data.js";
import FetchApi from "../helpers/FetchApi.js";

export default async function Playlists() {
	let template = "",
		resArtist = await FetchApi(endpoints.playLists),
		artists = resArtist.items;

	// first we save the information in a variable and then we will incorporate it into the DOM
	artists.forEach((el) => {
		template += `
    <a href="${el.tracks.href}">
      <img src="${el.images[0].url}" alt="${el.name}" />
      <p>${el.name} </p>
    </a>
    `;
	});

	return `
    <article class="playlists">
      ${template}
    </article>
  `;
}
