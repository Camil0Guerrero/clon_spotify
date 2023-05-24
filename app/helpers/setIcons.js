import { images } from "../assets/images.js";
// This file is in charge of finding and incorporating the icons

export default function setIcons(d = document) {
	setTimeout(() => {
		const $buttonPlay = d.querySelectorAll(".play"),
			$buttonPrevious = d.querySelector(".btn-previous-next .previous"),
			$buttonNext = d.querySelector(".btn-previous-next .next"),
			// Navmenu
			$logo = d.querySelector(".logo"),
			$iconHome = d.querySelector(".pages .home"),
			$iconSearch = d.querySelector(".pages .search"),
			$iconLibrary = d.querySelector(".pages .library"),
			$iconCreatePlaylist = d.querySelector(".icon-create-playlist"),
			$iconLikedSongs = d.querySelector(".icon-liked-songs"),
			// Footer
			$iconShuffle = d.querySelector(".shuffle-song"),
			$iconPreviousSong = d.querySelector(".previous-song"),
			$iconNextSong = d.querySelector(".next-song"),
			$repeat = d.querySelector(".repeat-song"),
			$lyrics = d.querySelector(".lyrics"),
			$queue = d.querySelector(".queue"),
			$devices = d.querySelector(".devices"),
			$volume = d.querySelector(".volume");

		$buttonPlay.forEach((button) => {
			button.innerHTML = images.iconPlay;
		});

		$buttonPrevious.innerHTML = images.iconPreviousPage;

		$buttonNext.innerHTML = images.iconNextPage;

		// Navmenu
		$logo.innerHTML = images.logo;

		$iconHome.innerHTML = images.iconHome + `<p>Home</p>`;

		$iconSearch.innerHTML = images.iconSearch + `<p>Search</p>`;

		$iconLibrary.innerHTML = images.iconLibrary + `<p>Your Library</p>`;

		$iconCreatePlaylist.innerHTML = images.iconCreatePlaylist;

		$iconLikedSongs.innerHTML = images.iconLikedSongs;

		// Footer
		$iconShuffle.innerHTML = images.iconAleatory;

		$iconPreviousSong.innerHTML = images.iconPreviousSong;

		$iconNextSong.innerHTML = images.iconNextSong;

		$repeat.innerHTML = images.iconRepeat;

		$lyrics.innerHTML = images.iconLyrics;

		$queue.innerHTML = images.iconQueue;

		$devices.innerHTML = images.iconDevices;

		$volume.innerHTML = images.iconVolumeLow;
	}, 300);
}
