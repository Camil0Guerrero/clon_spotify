async function fetchApi(endpoint, method, access_token, body) {
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
		console.log(`Error al traer las ultimas canciones`, err);
	}
}

async function getTopTracks(access_token) {
	let information = await fetchApi("v1/me/top/tracks?limit=5&offset=0", "GET", access_token),
		items = information.items;
	return items;
}

async function getPlayLists(access_token) {
	let resPlayList = await fetchApi("v1/me/playlists", "GET", access_token),
		playLists = resPlayList.items;

	return playLists;
}

async function searchArtist(query, access_token) {
	let artists = await fetchApi(`v1/search?q=${query}&type=artist`, "GET", access_token),
		items = artists.artists.items;

	return items;
}

export default async function getData(operation, access_token, query) {
	switch (operation) {
		case "artists":
			const search = await searchArtist(query, access_token);
			return await search;
			break;

		case "topTracks":
			const topTracks = await getTopTracks(access_token);

			return topTracks;

		case "playlists":
			const playLists = await getPlayLists(access_token);

			return playLists;
			break;

		default:
			break;
	}
}
