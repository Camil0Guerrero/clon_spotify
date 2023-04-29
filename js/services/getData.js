import { operations } from "../../assets/data.js";

async function fetchApi(endpoint, access_token, method = "GET", body) {
	try {
		const res = await fetch(`https://api.spotify.com/${endpoint}`, {
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
		} else {
			throw { status: res.status, statusText: res.statusText };
		}
	} catch (err) {
		console.log(`Error al hacer fetching de datos`, err);
	}
}

async function meInformation(access_token) {
	let information = await fetchApi("v1/me", access_token);
	return information;
}

async function getLikedSongs(access_token) {
	let songs = await fetchApi("v1/me/tracks/", access_token),
		items = songs.items;

	return items;
}

async function getTopTracks(access_token) {
	let information = await fetchApi("v1/me/top/tracks?limit=5&offset=0", access_token),
		items = information.items;
	return items;
}

async function getPlayLists(access_token) {
	let resPlayList = await fetchApi("v1/me/playlists", access_token),
		playLists = resPlayList.items;

	return playLists;
}

async function searchArtist(query, access_token) {
	let artists = await fetchApi(`v1/search?q=${query}&type=artist`, access_token),
		items = artists.artists.items;

	return items;
}

export default async function getData(operation, access_token, query) {
	switch (operation) {
		case "artists":
			const search = await searchArtist(query, access_token);
			return await search;

		case "me":
			const information = await meInformation(access_token);
			return information;

		case "topTracks":
			const topTracks = await getTopTracks(access_token);

			return topTracks;

		case "playlists":
			const playLists = await getPlayLists(access_token);
			return playLists;

		case operations.likedSongs:
			const songs = await getLikedSongs(access_token);
			return songs;
		default:
			break;
	}
}
