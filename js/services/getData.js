import { operations } from "../../assets/data.js";
import getToken from "./getToken.js";

let [access_token] = getToken();

async function fetchApi(endpoint, method = "GET", body) {
	try {
		const res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
			headers: {
				Authorization: `Bearer ${access_token}`,
				"Content-Type": "application/json",
			},
			method,
			body: JSON.stringify(body),
		});

		if (res.ok) {
			// This state is when no songs are playing on spotify
			if (res.status === 204) {
				return "not playing";
			}

			let response = await res.json();
			return await response;
		} else if (res.status === 401) {
			// If it returns this error, it may be because our token has expired, so it is necessary to log in again
			window.location.href = "http://127.0.0.1:5500/login.html";
		} else {
			throw { status: res.status, statusText: res.statusText };
		}
	} catch (err) {
		console.log(`Error al hacer fetching de datos`, err);
	}
}

async function meArtists() {
	let resArtists = await fetchApi(`me/top/artists?limit=7`),
		items = resArtists.items;

	return items;
}

async function meDevices() {
	let resDevices = await fetchApi(`me/player`);
	if (resDevices === "not playing") return null;

	let item = resDevices.item,
		infoDevice = resDevices.device;

	return [resDevices, item, infoDevice];
}

async function meInformation() {
	let information = await fetchApi("me");
	return information;
}

async function meSongs(limit) {
	let resSongs = await fetchApi(`me/top/tracks?limit=${limit}`),
		items = resSongs.items;

	return items;
}

async function getLikedSongs() {
	let songs = await fetchApi("me/tracks/"),
		items = songs.items,
		total = songs.total;

	return [items, total];
}

async function getPlayLists() {
	let resPlayList = await fetchApi("me/playlists"),
		playLists = resPlayList.items;

	return playLists;
}

async function getRecommendations() {
	let resRecommendations = await fetchApi("recommendations/available-genre-seeds"),
		genres = resRecommendations.genres;
	return genres;
}

async function search(query, type, limit) {
	if (type === "artist") {
		let artists = await fetchApi(`search?q=${query}&type=${type}&limit=${limit}`),
			items = artists.artists.items;
		return items;
	}

	if (type === "track") {
		let tracks = await fetchApi(`search?q=${query}&type=${type}&limit=${limit}`),
			items = tracks.tracks.items;
		return items;
	}
}

export default async function getData(operation, limit = 20, query, type) {
	// I have created these operations in a separate file so that it is more organized, also if it is necessary to make changes it will only be done in this one. The values that I have assigned have been Symbols so that each of our operations are unique
	switch (operation) {
		// All our operations are done from a fetch, only the data we need and the endpoint will change

		case operations.search:
			const resSearch = await search(query, type, limit);
			return await resSearch;

		case operations.me:
			const information = await meInformation();
			return information;

		case operations.playLists:
			const playLists = await getPlayLists();
			return playLists;

		case operations.likedSongs:
			const likedSongs = await getLikedSongs();
			return likedSongs;

		case operations.recommendations:
			const recommendations = await getRecommendations();
			return recommendations;

		case operations.meArtists:
			const artists = await meArtists();
			return artists;

		case operations.meSongs:
			const resMeSongs = await meSongs(limit);
			return resMeSongs;

		case operations.meDevices:
			const devices = await meDevices();
			return devices;

		default:
			break;
	}
}
