import { operations } from "../../assets/data.js";
import showTable from "../../js/components/tableSongs.js";
import getData from "../../js/services/getData.js";
import setIcons from "../../js/services/setIcons.js";

export default async function likedSongs(d = document, w = window) {
	let [likedSongs, total] = await getData(operations.likedSongs),
		informationUser = await getData(operations.me);

	// Show the songs using this function
	showTable(likedSongs);

	// User content and total songs
	let template = `
	<img src="${informationUser.images[0].url}" alt="${informationUser.display_name}" />
	<a href="${informationUser.href}" target="_blank" rel="noopener">
	${informationUser.display_name}
	</a>
	<span style="margin: 0 4px">•</span>
	<span>${total} 	songs</span>
	`,
		coreContent = `
		<button class="play center"></button>
			<span>Liked Songs</span>
			`;

	// Add icons
	setIcons();
	d.querySelector(".user-information").innerHTML = template;

	const $container = d.querySelector(".core-content");
	$container.classList.add("none");
	$container.style = `transition: none;`;
	$container.innerHTML = coreContent;

	d.addEventListener("scroll", () => {
		// Control when the top content is displayed
		if (d.querySelector(".core-content span")) {
			let scrollTop = w.pageYOffset || d.documentElement.scrollTop;

			if (scrollTop > 375) {
				$container.classList.remove("none");
				$container.style = ``;
			} else {
				$container.classList.add("none");
			}
		}
	});
}
