import getData from "../../services/getData.js";
import getToken from "../../services/getToken.js";

const d = document,
	$prueba = d.querySelector(".information-user button"),
	$accountOptions = d.querySelector(".content-menu-profile"),
	iconOpen = `
    <path d="m14 6-6 6-6-6h12z"></path>
  `,
	iconClose = `
    <path d="M14 10 8 4l-6 6h12z"></path>
  `;

d.addEventListener("DOMContentLoaded", async (e) => {
	let [access_token] = getToken();
	let resArtist = await getData("me", access_token);

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

	$prueba.innerHTML = template;
});

d.addEventListener("click", (e) => {
	if (e.target.matches(".information-user *")) {
		if ($accountOptions.classList.contains("none")) {
			$accountOptions.classList.remove("none");
			d.querySelector(".information-user-icon").innerHTML = iconClose;
		} else {
			$accountOptions.classList.add("none");
			d.querySelector(".information-user-icon").innerHTML = iconOpen;
		}
	}
});
