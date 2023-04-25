import getData from "../../js/services/getData.js";
import getToken from "../../js/services/getToken.js";

const d = document;

let template = "";

d.addEventListener("DOMContentLoaded", async (e) => {
	let [access_token, refresh_token] = getToken();
	let resArtist = await getData("artists", access_token, `Blake`);

	let $prueba = d.querySelector(".prueba");
	resArtist.map((el) => {
		template += `
    <a href="${el.uri}">
      <figure>
        <img src="${el.images[0].url}" alt="${el.name}" />
        <h4>${el.name}</h4>
        <h3>Artist</h3>
      </figure>
    </a>
    `;

		$prueba.innerHTML = template;
	});
});
