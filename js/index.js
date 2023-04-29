import getData from "./services/getData.js";
import getToken from "./services/getToken.js";
import { operations } from "../assets/data.js";

const d = document,
	$prueba = d.querySelector(".pruebas");

d.addEventListener("DOMContentLoaded", async (e) => {
	let [access_token] = getToken();
});
