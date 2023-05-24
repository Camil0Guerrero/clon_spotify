import { calcTime } from "./calcTime.js";
import { images } from "../assets/images.js";

export default async function infoSong(information) {
	const d = document,
		$timeline = d.querySelector(".timeline");

	// Sound
	const $volumeRange = d.querySelector(".volume-range");

	$volumeRange.style.backgroundSize = `${information.device.volume_percent}%`;

	const timeLinePosition = () => {
		let progress_sg = information.progress_ms / 60,
			duration_sg = information.item.duration_ms / 60;

		const percentagePosition = (100 * progress_sg) / duration_sg;
		$timeline.style.backgroundSize = `${percentagePosition}%`;
		$timeline.value = percentagePosition;

		d.querySelector(".current-time").innerHTML = `${calcTime(information.progress_ms).minutes}:${
			calcTime(information.progress_ms).seconds
		}`;
	};

	timeLinePosition();

	const changeVolume = () => {
		let volume = information.device.volume_percent,
			$soundButton = d.querySelector(".sound-button");

		d.querySelector(".volume-range").value = volume / 100;
		if (volume >= 1 && volume <= 40) {
			$soundButton.innerHTML = images.iconVolumeLow;
		} else if (volume >= 41 && volume <= 65) {
			$soundButton.innerHTML = images.iconVolumeMedium;
		} else if (volume >= 66 && volume <= 100) {
			$soundButton.innerHTML = images.iconVolumeHigh;
		} else {
			$soundButton.innerHTML = images.muteIcon;
		}
	};

	changeVolume();

	const changeIcons = () => {
		let $repeat = d.querySelector(".repeat-song");
		switch (information.repeat_state) {
			case "context":
				$repeat.classList.add("active");
				break;
			case "track":
				$repeat.innerHTML = images.repeatSong;
				$repeat.classList.add("active");
				break;

			default:
				break;
		}

		if (information.shuffle_state) {
			let $shuffle = d.querySelector(".shuffle-song");

			$shuffle.classList.add("active");
		}
	};

	changeIcons();
}
