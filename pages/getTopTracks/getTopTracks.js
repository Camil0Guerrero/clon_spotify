import button from "../../js/pruebas/button/button.js";
import createElementsForButton from "../../js/pruebas/button/createElements.js";
import getData from "../../js/services/getData.js";
import getToken from "../../js/services/getToken.js";

const d = document;

let template = "";

d.addEventListener("DOMContentLoaded", async (e) => {
	let [access_token] = getToken();
	let resArtist = await getData("topTracks", access_token);

	let $prueba = d.querySelector(".top-tracks");

	resArtist.map((el) => {
		let $div = createElementsForButton(el.id);
		template += `
    <figure>
      <img src="${el.album.images[0].url}" alt="${el.name}" />
      ${
				el.preview_url
					? `<audio src="${el.preview_url}" id="${el.id}"></audio> 
          <div class="controls">${$div.innerHTML}</div>`
					: `<p> Sin Muestra </p>`
			}
      <h4>${el.name}</h4>
      <p>${el.artists.map((artist) => artist.name)}</p>
    </figure>
    `;
		$prueba.innerHTML = template;
	});
});

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
