import Playlists from "./Playlists.js";

export default async function NavMenu() {
	return `
		<nav class="menu">
			<div>
				<a class="logo"></a>
			</div>

			<article class="pages">
				<a href="" class="home">
					<p>Home</p>
				</a>

				<a href="" class="search">
					<p>Search</p>
				</a>

				<a class="library">
					<p>Your Library</p>
				</a>
			</article>

			<article class="options">
				<a href="">
					<div class="icon-create-playlist center"></div>
					<p>Create Playlist</p>
				</a>

				<a href="" class="liked-songs">
					<div class="icon-liked-songs center"></div>
					<p>Liked Songs</p>
				</a>
			</article>
			<hr />

			${await Playlists()}
	</nav>
	`;
}