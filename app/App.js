import Device from "./components/Device.js";
import setIcons from "./helpers/setIcons.js";
import Main from "./components/Main.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import NavMenu from "./components/NavMenu.js";
import Head from "./components/Head.js";
import Router from "./components/Router.js";

export default async function App() {
	const d = document;

	d.querySelector("html").innerHTML = Head("Clon Spotify");
	d.querySelector("body").innerHTML = await Header();
	d.querySelector("body").innerHTML += await NavMenu();
	d.querySelector("body").innerHTML += `<main>${await Main()}</main>`;
	d.querySelector("body").innerHTML += `<footer>${Footer()}</footer> `;

	// I give a little time to wait for the response from the API
	let style = await Router();
	setIcons();
	Device(style);
}
