import { operations } from "../../assets/data.js";
import getData from "../../js/services/getData.js";

const calcTime = (ms) => {
	let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60)),
		seconds = ("0" + Math.floor((ms % (1000 * 60)) / 1000)).slice(-2);
	return { minutes, seconds };
};

export default async function search(d = document) {
	let genres = await getData(operations.recommendations),
		template = "",
		iconSearch = `
      <svg
      height="16"
      width="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      >
        <path
          d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zM.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7z"
        ></path>
      </svg>
    `;

	// Add the necessary components for the input
	d.querySelector(".core-content").innerHTML = `
    <form class="inp-search">
      ${iconSearch}
      <div class="animation-input">
        <input type="text" placeholder="What do you want to listen to?" />
        <div class="animation"></div>
      </div>
    </form>
    `;

	// When leaving a page, our element may remain with the class so as not to be seen
	d.querySelector(".core-content").classList.remove("none");

	// Get random color, this way is built in the hexadecimal format
	// "#" + (((1 << 24) * Math.random()) | 0).toString(16)

	// We assign each gender a different color
	genres.map((genre) => {
		template += `
    <a class="genre" style="background-color: #${(((1 << 24) * Math.random()) | 0).toString(16)}80">
      ${genre.slice(0, 1).toUpperCase()}${genre.slice(1)}
    </a>
    `;
	});

	d.querySelector(".recommendations").innerHTML = template;

	// Although our input is not in the entire element, we will make it assign the focus with the click
	d.addEventListener("click", (e) => {
		if (e.target.matches(".inp-search") || e.target.matches(".inp-search *")) {
			d.querySelector(".inp-search input").focus();
		}
	});

	d.addEventListener("submit", (e) => {
		e.preventDefault();

		// In this case the submit was not working well due to the animation and the container that I added for it.
	});

	d.addEventListener("change", async (e) => {
		e.preventDefault();
		// Don't add a lot of validations to the input input as that was not my main goal for this project

		// Test input validation with regex pattern
		const regex = new RegExp(/[A-Za-z0-9]+/g);
		if (!regex.test(e.target.value)) {
			return;
		}

		// So the search will be done with this event, it is activated when entering or the focus is removed
		let resArtist = await getData(operations.search, 7, e.target.value, "artist"),
			resSongs = await getData(operations.search, 5, e.target.value, "track"),
			templateArtists = "",
			templateSongs = "";

		resArtist.map((el) => {
			templateArtists += `
        <figure>
          <img src="${el.images[0].url}" alt="${el.name}" />
          <h4>${el.name}</h4>
          <p>Artist</p>
        </figure>
        `;
		});

		resSongs.map((el) => {
			templateSongs += `
      <tr>
        <td>
          <img src="${el.album.images[0].url}" alt="${el.name}" />
         </td>
         <td>
          <p>${el.name}</p>
          ${el.artists[0].name}
         </td>
         <td>
          ${calcTime(el.duration_ms).minutes}:${calcTime(el.duration_ms).seconds}
         </td>
      </tr>
      `;
		});

		d.querySelector("main").innerHTML = `
      <h3>Artists</h3>
      <div class="container-section">
        <div class="section">
          ${templateArtists} 
        </div>
      </div>

      <h3>Songs</h3>
      <table class="songs">
        <tbody>
        ${templateSongs}
        </tbody> 
      </table>
    `;
	});
}
