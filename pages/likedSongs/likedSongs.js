import { operations } from "../../assets/data.js";
import showTable from "../../js/components/tableSongs/tableSongs.js";
import getData from "../../js/services/getData.js";
import setIcons from "../../js/services/setIcons.js";

export default async function likedSongs(d = document, w = window) {
	let [likedSongs, total] = await getData(operations.likedSongs),
		informationUser = await getData(operations.me);

	showTable(likedSongs);

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

	setIcons();
	d.querySelector(".user-information").innerHTML = template;

	const $container = d.querySelector(".core-content");
	$container.classList.add("none");
	$container.style = `transition: none;`;
	$container.innerHTML = coreContent;

	/* 	const content = `
		<button class="play center">
			<svg  
      	role="img"
      	height="15"
      	width="15"
      	fill="currentColor"
     	 	viewBox="0 0 24 24"
     	 	class="start"
    	>
				<path
					d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
				></path>
			</svg>
		</button>
		<span>Liked Songs</span>
	`; */

	d.addEventListener("scroll", () => {
		if (d.querySelector(".core-content span")) {
			let scrollTop = w.pageYOffset || d.documentElement.scrollTop;

			/* 
		if (scrollTop > 375) {
			if (container.innerHTML === "") {
				container.insertAdjacentHTML("beforeend", content);
			}
		} else {
			container.innerHTML = "";
		} 
		*/

			if (scrollTop > 375) {
				$container.classList.remove("none");
				$container.style = ``;
			} else {
				$container.classList.add("none");
			}
		}
	});
}
