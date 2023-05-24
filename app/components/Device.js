// This file helps us connect with the information that Spotify is playing on another device
import { endpoints } from "../assets/data.js";
import Footer from "./Footer.js";
import infoSong from "../helpers/infoSongs.js";
import FetchApi from "../helpers/FetchApi.js";
import Head from "./Head.js";

export default async function Device(style) {
	const resDevices = await FetchApi(endpoints.meDevices),
		{ item, device } = resDevices,
		d = document;

	if (!resDevices) return;

	d.querySelector("head").innerHTML = await Head(item.name, style ? style : "");

	let $device = d.querySelector(".devices"),
		cardDevice = `
	<div class="show-device">
		<span>Listening On <p>${device.name}</p></span>
	</div>
	`;

	$device.classList.add("active");

	d.querySelector("footer").innerHTML = Footer(item);
	d.querySelector("footer").innerHTML += cardDevice;

	infoSong(resDevices);
}
