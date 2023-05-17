const calcTime = (ms) => {
	let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60)),
		seconds = ("0" + Math.floor((ms % (1000 * 60)) / 1000)).slice(-2);
	return { minutes, seconds };
};

export default function footer(informationSong, d = document) {
	// This function is in charge of taking the information of the song and putting it in the footer
	let template = "",
		el = informationSong[0];

	template = `<img src="${el.album.images[0].url}" alt="Image of the album ${el.album.name}" />`;

	template += `
    <div class="information-text">
      <a href="${el.href}">
        <h4>${el.name}</h4>
      </a>
      <span class="artists">
        ${el.artists.map((artist) => {
					return ` <a href="${artist.href}">${artist.name}</a>`;
				})}
      </span>
    </div>
  `;

	template += `
    <button>
			<svg height="16" width="16" fill="#b3b3b3">
				<path
					d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z"></path>
			</svg>
		</button>
  `;

	template += `
  <audio src="${el.preview_url}" id="${el.id}"></audio>
  `;

	d.querySelector(".reproduced-song-information").innerHTML = template;

	d.querySelector(".time-duration").innerHTML = `${calcTime(el.duration_ms).minutes}:${
		calcTime(el.duration_ms).seconds
	}`;
}
