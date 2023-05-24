import FetchApi from "../helpers/FetchApi.js";
import Table from "./Table.js";
import { endpoints } from "../assets/data.js";

export default async function LikedSongs(d = document, w = window) {
	const resLikedSongs = await FetchApi(endpoints.likedSongs),
		informationUser = await FetchApi(endpoints.me),
		{ items: likedSongs, total } = resLikedSongs,
		table = Table(likedSongs);

	// User content and total songs
	let coreContent = `
		<button class="play center"></button>
			<span>Liked Songs</span>
	`;

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

	return `
		<article class="headline">
      <img src="app/assets/iconLikedSongs.png" alt="Liked Songs" />
      <section class="information-songs">
        <span>Playlist</span>
        <h1>Liked Songs</h1>
        <div class="user-information">
					<img src="${informationUser.images[0].url}" alt="${informationUser.display_name}" />
					<a href="${informationUser.href}" target="_blank" rel="noopener">
						${informationUser.display_name}
					</a>
					<span style="margin: 0 4px">•</span>
					<span>${total} songs</span>
				</div>
      </section>
    </article>

    <article class="btn-start">
	    <button class="play center"></button>
    </article>
		<table>
    	<thead>
				<tr>
					<th></th>
					<th>Title</th>
					<th>Album</th>
					<th>Date Added</th>
					<th class="time-icon center"></th>
				</tr>
	  	</thead>
   	 	<tbody>
				${table}
   		</tbody>
		</table>
	`;
}
