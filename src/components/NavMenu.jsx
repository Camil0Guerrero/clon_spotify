import Playlists from "./Playlists.jsx";
import "../assets/css/navMenu.css";
import { endpoints } from "../assets/data.js";
import useFetch from "../hooks/useFetch.jsx";
import { NavLink } from "react-router-dom";
import Message from "./Message.jsx";

export default function NavMenu() {
	const { data: playlists, err, loading } = useFetch(endpoints.playLists);

	return (
		<>
			<nav className="menu">
				<div>
					<a className="logo"></a>
				</div>

				<article className="pages">
					<NavLink to="/" className="home">
						Home
					</NavLink>

					<NavLink to="/search" className="search">
						Search
					</NavLink>

					<NavLink to="/your-library" className="library">
						Your Library
					</NavLink>
				</article>

				<article className="options">
					<a href="">
						<div className="icon-create-playlist center"></div>
						<p>Create Playlist</p>
					</a>

					<NavLink to="/liked-songs" className="liked-songs">
						<div className="icon-liked-songs center"></div>
						LikedSongs
					</NavLink>
				</article>
				<hr />

				<article
					className="playlists"
					style={playlists && { height: `${playlists.items.length * 45}px` }}
				>
					{loading && (
						<div
							className="spinner"
							style={{ width: "25px", height: "25px" }}
						></div>
					)}
					{err && (
						<Message bgColor={"#dc3545"} color={"#fff"}>
							<h2>Sorry, an error ocurred with the playlists</h2>
						</Message>
					)}
					{playlists &&
						playlists.items.map((el, index) => (
							<Playlists key={index} el={el} />
						))}
				</article>
			</nav>
		</>
	);
}
