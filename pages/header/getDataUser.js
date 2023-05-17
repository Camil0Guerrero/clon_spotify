import getData from "../../js/services/getData.js";
import { operations } from "../../assets/data.js";

let d = document,
	iconOpen = `
			<path d="m14 6-6 6-6-6h12z"></path>
		`;

export default async function getDataUser() {
	// With this function display user information
	const $infoUserBtn = d.querySelector(".information-user button");

	let resArtist = await getData(operations.me);

	let template = `
    <img
		draggable="false"
      src="${resArtist.images[0].url}"
      alt="${resArtist.display_name}"
    />
    <span>${resArtist.display_name}</span>

    <svg class="information-user-icon" height="16" width="16" fill="currentColor" viewBox="0 0 16 16">
    ${iconOpen}
    </svg>
    `;

	$infoUserBtn.innerHTML = template;
}
