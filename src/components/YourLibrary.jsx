import { endpoints } from "../assets/data.js";
import useFetch from "../hooks/useFetch.jsx";
import Header from "./Header.jsx";
import "../assets/css/yourLibrary.css";
import Message from "./Message.jsx";

export default function YourLibrary() {
	const { data: me = "Camilo Guerrero", loading: loadMe } = useFetch(
		endpoints.me
	);
	const {
		data: playLists = [],
		playlistsError,
		loadPlayList,
	} = useFetch(endpoints.playLists);
	const {
		data: resLikedSongs,
		err: likedSongsError,
		loading: loadLikedSongs,
	} = useFetch(endpoints.likedSongs);

	if (loadMe || loadPlayList || loadLikedSongs)
		return (
			<main>
				<div className="spinner"></div>
			</main>
		);

	const { items: likedSongs = [], total } = resLikedSongs;

	return (
		<>
			<Header>
				<a>Playlists</a>
				<a>Artists</a>
				<a>Albums</a>
				<a>Podcasts & Shows</a>
			</Header>
			<main>
				<h2>Playlists</h2>
				<div className="container-playlists">
					<div className="card-liked-songs">
						<div className="songs">
							{likedSongs.length > 0
								? likedSongs.map(el => (
										<span key={el.track.id}>
											{el.track.artists[0].name}
											<span style={{ opacity: "0.7" }}>
												{" "}
												{el.track.name} •{" "}
											</span>
										</span>
								  ))
								: "You don't have liked songs"}
							{likedSongsError && (
								<Message bgColor={"#dc3545"} color={"#fff"}>
									<h2>Sorry, an error ocurred with the Liked Songs</h2>
								</Message>
							)}
						</div>
						<h3>Liked Songs</h3>
						<p>{total} Liked songs</p>
						<button className="play center"></button>
					</div>
					{playLists.items.length > 0
						? playLists.items.map(el => (
								<figure key={el.id}>
									<div className="container-img-figure">
										<img src={el.images[0].url} alt={el.name} />
										<button className="play center"></button>
									</div>
									<h4>{el.name}</h4>
									<p>By {me.display_name}</p>
								</figure>
						  ))
						: "You don't have playlists"}
					{playlistsError && (
						<Message bgColor={"#dc3545"} color={"#fff"}>
							<h2>Sorry, an error ocurred with the playlists</h2>
						</Message>
					)}
				</div>
			</main>
		</>
	);
}
