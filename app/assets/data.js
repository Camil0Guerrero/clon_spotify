export const data = {
	client_id: "c742a7eae2d84f20be8f484a00abcdcc",
	client_secret: "f3fb77d79ab249b7b567d2c4a55c788e",
	redirect_uri: "http://127.0.0.1:5500/",
	scope:
		"user-read-private user-read-email playlist-read-private user-top-read user-library-read user-read-playback-state user-modify-playback-state user-follow-read",
};

export const endpoints = {
	me: "me",
	likedSongs: "me/tracks/",
	playLists: "me/playlists",
	recommendations: "recommendations/available-genre-seeds",
	search: {
		artists: "search?type=artist&limit=7&q=",
		tracks: "search?type=track&limit=5&q=",
	},
	meArtists: "me/top/artists?limit=7",
	meDevices: "me/player",
	meSongs: "me/top/tracks?limit=5",
};
