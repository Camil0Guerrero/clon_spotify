/* eslint-disable no-prototype-builtins */
import { calcTime } from "../helpers/calcTime.jsx";
import "../assets/css/footer.css";

const imagesFooter = {
	iconVolumeLow: (
		<svg height="16" width="16" viewBox="0 0 16 16">
			<path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
		</svg>
	),
	iconVolumeMedium: (
		<svg height="16" width="16" viewBox="0 0 16 16">
			<path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z"></path>
		</svg>
	),
	iconVolumeHigh: (
		<svg height="16" width="16" viewBox="0 0 16 16">
			<path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
			<path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path>
		</svg>
	),
	repeatSongActive: (
		<svg role="img" height="16" width="16">
			<path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h.75v1.5h-.75A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5zM12.25 2.5h-.75V1h.75A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25z"></path>
			<path d="M9.12 8V1H7.787c-.128.72-.76 1.293-1.787 1.313V3.36h1.57V8h1.55z"></path>
		</svg>
	),
	repeatSongOff: (
		<svg role="img" height="16" width="16" viewBox="0 0 16 16">
			<path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"></path>
		</svg>
	),
};

export default function Footer({ informationSong = {}, device = [] }) {
	const currentTime = () => {
		let time = calcTime(device.progress_ms);
		return `${time.minutes}:${time.seconds}`;
	};

	const timeDuration = () => {
		let time = calcTime(informationSong.duration_ms);
		return `${time.minutes}:${time.seconds}`;
	};

	const timeLinePosition = () => {
		let progress_sg = device.progress_ms / 60,
			duration_sg = informationSong.duration_ms / 60;

		const percentage = (progress_sg * 100) / duration_sg;

		return `${percentage}`;
	};

	let a = false,
		volume = 0;

	if (informationSong.hasOwnProperty("album")) {
		a = true;
		volume = device.device.volume_percent;
	}

	return (
		<>
			<footer>
				<div className="footer">
					<article className="reproduced-song-information">
						{a && (
							<img
								src={informationSong.album.images[0].url}
								alt={informationSong.album.name}
							/>
						)}
						<div className="information-text">
							{a && (
								<a href={informationSong.href}>
									<h4>{informationSong.name}</h4>
								</a>
							)}
							<span className="artists">
								{a &&
									informationSong.artists.map((artist, index) => (
										<a key={index} href={artist.href}>
											{artist.name}
										</a>
									))}
							</span>
							<button>
								<svg height="16" width="16" fill="#b3b3b3">
									<path d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z"></path>
								</svg>
							</button>
							{a && (
								<audio
									src={informationSong.preview_url}
									id={informationSong.id}
								></audio>
							)}
						</div>
					</article>

					<article className="controls">
						<section className="operations">
							<button
								className={
									a && device.shuffle_state
										? "shuffle-song center active"
										: "shuffle-song center"
								}
							></button>
							<button className="previous-song center"></button>
							<button className="play center player-button"></button>
							<button className="pause none center"></button>
							<button className="next-song center"></button>
							<button
								className={
									a && device.repeat_state === "off"
										? "repeat-song center"
										: "repeat-song center active"
								}
							>
								{a && device.repeat_state === "track"
									? imagesFooter.repeatSongActive
									: imagesFooter.repeatSongOff}
							</button>
						</section>

						<section className="time-control">
							<span className="current-time">{a && currentTime()}</span>
							<input
								type="range"
								className="timeline"
								min="0"
								max="100"
								value={a ? timeLinePosition() : 0}
								style={{ backgroundSize: a && timeLinePosition() + "%" }}
								readOnly
							/>
							<span className="time-duration">{a && timeDuration()}</span>
						</section>
					</article>

					<article className="other-tools">
						<button className="lyrics center"></button>
						<button className="queue center"></button>
						<button
							className={a ? "devices center active" : "devices center"}
						></button>
						<button className="volume center sound-button">
							{a && volume <= 40
								? imagesFooter.iconVolumeLow
								: volume <= 65
								? imagesFooter.iconVolumeMedium
								: imagesFooter.iconVolumeHigh}
						</button>
						<input
							type="range"
							min="0"
							max="1"
							step="0.1"
							className="volume-range"
							style={{
								backgroundSize: a && device.device.volume_percent + "%",
							}}
							value={a && device.device.volume_percent / 100}
							readOnly
						/>
					</article>
				</div>
			</footer>
			{a && (
				<div className="show-device">
					<span>
						Listening On <p>{device.device.name}</p>
					</span>
				</div>
			)}
		</>
	);
}
