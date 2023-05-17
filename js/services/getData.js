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
			let artists = await res.json();

			return await artists;
		} else if (res.status === 401) {
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
	let resDevices = await fetchApi(`me/player`),
		item = resDevices.item,
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

async function getTopTracks() {
	let information = await fetchApi("me/top/tracks?limit=5&offset=0"),
		items = information.items;
	return items;
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
	switch (operation) {
		case operations.search:
			const resSearch = await search(query, type, limit);
			return await resSearch;

		case operations.me:
			const information = await meInformation();
			return information;

		case "topTracks":
			const topTracks = await getTopTracks();

			return topTracks;

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
