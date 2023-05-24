import { calcTime } from "../helpers/calcTime.js";

export default function Footer(informationSong) {
	// This function is in charge of taking the information of the song and putting it in the footer
	let img = "",
		a,
		artists = "",
		audio,
		timeDuration;

	if (!informationSong) {
		a = `<a href=""></a>`;
		audio = `<audio src=""></audio>`;
		timeDuration = `3:00`;
	} else {
		img = `<img src="${informationSong.album.images[0].url}" alt="Image of the album ${informationSong.album.name}" />`;
		a = `
		<a href="${informationSong.href}">
			<h4>${informationSong.name}</h4>
		</a>
		`;
		artists = informationSong.artists.map((artist) => {
			return ` <a href="${artist.href}">${artist.name}</a>`;
		});
		audio = `<audio src="${informationSong.preview_url}" id="${informationSong.id}"></audio>`;
		timeDuration = `${calcTime(informationSong.duration_ms).minutes}:${calcTime(informationSong.duration_ms).seconds}`;
	}

	return `
		<div class="footer">
			<article class="reproduced-song-information">
				${img}
				<div class="information-text">
					${a}
					<span class="artists">
						${artists}
      		</span>
					<button>
						<svg height="16" width="16" fill="#b3b3b3">
							<path
								d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z">
							</path>
						</svg>
					</button>
					${audio}
				</div>
			</article>

			<article class="controls">
				<section class="operations">
					<!-- Shuffle -->
					<button role="switch" class="shuffle-song center"></button>
					<!-- Previous -->
					<button class="previous-song center"></button>
					<!-- Pause / Play -->
					<button class="play center player-button"></button>
					<!-- <button class="pause none center"></button> -->
					<!-- Next -->
					<button class="next-song center"></button>
					<!-- Repeat -->
					<button class="repeat-song center"></button>
				</section>

				<section class="time-control">
					<span class="current-time"></span>
					<input type="range" class="timeline" min="0" max="100" value="0" />
					<span class="time-duration">${timeDuration}</span>
				</section>
			</article>

			<article class="other-tools">
				<button class="lyrics center"></button>
				<button class="queue center"></button>
				<button class="devices center"></button>
				<button class="volume center sound-button"></button>
				<input type="range" min="0" max="1" step="0.1" value="0.05" class="volume-range" />
			</article>
		</div>
	`;
}
