import useFetch from "../hooks/useFetch.jsx";
import Table from "./Table.jsx";
import { endpoints } from "../assets/data.js";
import "../assets/css/likedSongs.css";
import Message from "./Message.jsx";

export default function LikedSongs() {
	if (window.location.pathname !== "/liked-songs") return;

	const { data: meData, loading: loadMe } = useFetch(endpoints.me);
	const {
		data: resLikedSongs,
		err: likedSongsError,
		loading: loadLikedSongs,
	} = useFetch(endpoints.likedSongs);
	const iconLikedSongs = "/src/assets/iconLikedSongs.png";

	if (loadLikedSongs || loadMe) return;
	<main>
		<div className="spinner"></div>
	</main>;

	const { items: likedSongs, total } = resLikedSongs;

	setTimeout(() => {
		document.querySelector(".core-content").innerHTML = `
			<button class="play center"></button>
			<span>Liked Songs</span>
		`;
	}, 100);

	// Control when the top content is displayed
	document.addEventListener("scroll", () => {
		let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		if (scrollTop > 375) {
			document.querySelector(".core-content").classList.remove("none");
		} else {
			document.querySelector(".core-content").classList.add("none");
		}
	});

	return (
		<main
			style={{
				backgroundImage:
					"linear-gradient(var(--bgc-primary) -30%,var(--bgc-secondary))",
				paddingLeft: "0",
				paddingRight: "0",
			}}
		>
			<article className="headline">
				<img src={iconLikedSongs} alt="Liked Songs" />
				<section className="information-songs">
					<span>Playlist</span>
					<h1>Liked Songs</h1>
					<div className="user-information">
						<img src={meData.images[0].url} alt={meData.display_name} />
						<a href={meData.href} target="_blank" rel="noreferrer">
							{meData.display_name}
						</a>
						<span style={{ margin: "0 4px" }}>•</span>
						<span>{total} songs</span>
					</div>
				</section>
			</article>

			<article className="btn-start">
				<button className="play center"></button>
			</article>

			<table className="table-liked-songs">
				<thead>
					<tr>
						<th></th>
						<th>Title</th>
						<th>Album</th>
						<th>Date Added</th>
						<th className="time-icon center"></th>
					</tr>
				</thead>
				<tbody>
					{likedSongsError && (
						<Message bgColor={"#dc3545"} color={"#fff"}>
							<h2>Sorry, an error ocurred with the Liked Songs</h2>
						</Message>
					)}
					{likedSongs &&
						likedSongs.map((el, index) => <Table key={index} el={el} />)}
				</tbody>
			</table>
		</main>
	);
}
