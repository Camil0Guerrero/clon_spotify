import { images } from "../../../assets/images.js";

export default function button(playerButton, d = document) {
	const $audio = d.getElementById(playerButton.dataset.id),
		$timeline = d.querySelector(".timeline"),
		$player = d.querySelector(".player-button");

	// Sound
	const $soundButton = d.querySelector(".sound-button"),
		$volumeRange = d.querySelector(".volume-range");

	if (!$audio) {
		return;
	}

	$audio.volume = 0.1;
	$volumeRange.style.backgroundSize = `${$audio.volume * 100}%`;
	$volumeRange.value = $audio.volume;

	const audioEnded = () => {
		$player.innerHTML = images.iconPlay;
		$audio.currentTime = 0;
	};

	const changeTimeLinePosition = () => {
		const percentagePosition = (100 * $audio.currentTime) / $audio.duration;
		$timeline.style.backgroundSize = `${percentagePosition}%`;
		$timeline.value = percentagePosition;

		d.querySelector(".current-time").innerHTML = ("0" + `${~~$audio.currentTime}`).slice(-2);
	};

	const changeSeek = () => {
		const time = ($timeline.value * $audio.duration) / 100;
		$audio.currentTime = time;
	};

	const changeVolume = () => {
		$audio.volume = $volumeRange.value;
		$volumeRange.style.backgroundSize = `${$audio.volume * 100}%`;

		if ($audio.volume >= 0.1 && $audio.volume <= 0.4) {
			d.querySelector(".sound-button").innerHTML = images.iconVolumeLow;
		} else if ($audio.volume >= 0.5 && $audio.volume <= 0.7) {
			d.querySelector(".sound-button").innerHTML = images.iconVolumeMedium;
		} else if ($audio.volume >= 0.8 && $audio.volume <= 1) {
			d.querySelector(".sound-button").innerHTML = images.iconVolumeHigh;
		} else {
			$audio.muted;
			d.querySelector(".sound-button").innerHTML = images.muteIcon;
		}
	};

	const toggleAudio = () => {
		if ($audio.paused) {
			$audio.play();
			$player.innerHTML = images.iconPause;
		} else {
			$audio.pause();
			$player.innerHTML = images.iconPlay;
		}
	};

	toggleAudio();

	const toggleSound = () => {
		$audio.muted = !$audio.muted;
		$soundButton.innerHTML = $audio.muted ? images.muteIcon : images.iconVolumeMedium;
	};

	$audio.onended = audioEnded;

	$audio.ontimeupdate = changeTimeLinePosition;

	$player.addEventListener("click", toggleAudio);

	$timeline.addEventListener("change", changeSeek);

	$soundButton.addEventListener("click", toggleSound);

	$volumeRange.addEventListener("change", changeVolume);
}
