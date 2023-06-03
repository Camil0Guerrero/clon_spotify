import { endpoints } from "../assets/data.js";
import useFetch from "../hooks/useFetch.jsx";
import FavoritePlaylists from "./FavoritePlaylists";
import "../assets/css/main.css";
import FavoriteArtists from "./FavoriteArtists.jsx";
import FavoriteSongs from "./FavoriteSongs.jsx";
import Message from "./Message.jsx";

const gettingTitle = () => {
	// Show a different greeting depending on the time of day
	let today = new Date(),
		time = today.toLocaleTimeString(),
		hour = time.slice(0, 2);

	if (hour >= 0 && hour < 12) {
		return "Good Morning";
	} else if (hour >= 12 && hour <= 19) {
		return "Good Afternoon";
	} else {
		return "Good Night";
	}
};

export default function Main() {
	const {
		data: playlists,
		err: errPlaylists,
		loading: loadPlayLists,
	} = useFetch(endpoints.playLists);
	const {
		data: artists,
		err: errArtists,
		loading: loadArtists,
	} = useFetch(endpoints.meArtists);
	const {
		data: songs,
		err: errSongs,
		loading: loadSongs,
	} = useFetch(endpoints.meSongs);

	if (loadPlayLists || loadArtists || loadSongs) {
		return (
			<main>
				<div className="spinner"></div>
			</main>
		);
	} else if (errPlaylists || errArtists || errSongs) {
		console.log(
			`Err to doing the request in Main : ${
				errPlaylists || errArtists || errSongs
			}`
		);
	}

	return (
		<main>
			<h2 className="title-main">{gettingTitle()}</h2>
			<article className="recently-heard">
				<aside className="cards">
					<div>
						<img
							src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
							alt="Image of liked song"
						/>

						<div className="content-card">
							<p>Liked Songs</p>
							<button className="play center"></button>
						</div>
					</div>
					{playlists &&
						playlists.items
							.slice(0, 5)
							.map((el, index) => <FavoritePlaylists key={index} el={el} />)}
					{errPlaylists && (
						<Message bgColor={"#dc3545"} color={"#fff"}>
							<h2>Sorry, an error ocurred with the playlists</h2>
						</Message>
					)}
				</aside>
			</article>

			<h2>Made for Camilo Guerrero</h2>
			<article className="recommendations">
				<h3>Your Artists</h3>
				<div className="container-section">
					<div className="section">
						{artists &&
							artists.items.map((el, index) => (
								<FavoriteArtists key={index} el={el} />
							))}
						{errArtists && (
							<Message bgColor={"#dc3545"} color={"#fff"}>
								<h2>Sorry, an error ocurred with the artists</h2>
							</Message>
						)}
					</div>
				</div>

				<h3>Your Songs</h3>
				<div className="container-section">
					<div className="section">
						{songs &&
							songs.items.map((el, index) => (
								<FavoriteSongs key={index} el={el} />
							))}
						{errSongs && (
							<Message bgColor={"#dc3545"} color={"#fff"}>
								<h2>Sorry, an error ocurred with the songs</h2>
							</Message>
						)}
					</div>
				</div>
			</article>
		</main>
	);
}
