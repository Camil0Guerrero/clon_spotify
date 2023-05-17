// This document is important for me because i'm want learn so much with it

import { operations } from "../assets/data.js";
import { images } from "../assets/images.js";
import footer from "../pages/footer/footer.js";
import getData from "./services/getData.js";

let d = document;

const calcTime = (ms) => {
	let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60)),
		seconds = ("0" + Math.floor((ms % (1000 * 60)) / 1000)).slice(-2);
	return { minutes, seconds };
};

async function infoSong(information) {
	console.log(information);
	const $timeline = d.querySelector(".timeline");

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
			let $shuffle = d.querySelector(".aleatory-song");

			$shuffle.classList.add("active");
		}
	};

	changeIcons();
}

export default async function device() {
	const [resDevices, item, infoDevice] = await getData(operations.meDevices);

	if (!resDevices) {
		return;
	}

	d.querySelector("head").innerHTML += `<link rel="stylesheet" href="css/device.css" />`;

	let $device = d.querySelector(".devices"),
		cardDevice = `
    <div class="show-device">
      <span>Listening On <p>${infoDevice.name}</p></span>
    </div>
    `;

	$device.classList.add("active");
	d.querySelector("footer").innerHTML += cardDevice;

	footer([item]);

	infoSong(resDevices);
}
