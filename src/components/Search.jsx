import { useEffect, useState } from "react";
import { endpoints } from "../assets/data.js";

import useFetch from "../hooks/useFetch.jsx";
import "../assets/css/search.css";
import FavoriteArtists from "./FavoriteArtists.jsx";
import SearchSongs from "./SearchSongs.jsx";
import Header from "./Header.jsx";
import SearchForm from "./SearchForm.jsx";
import Message from "./Message.jsx";
import getToken from "../helpers/getToken.js";

const getWarmColor = () => {
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);

	// Solo retorna colores cálidos
	// Only return warm colors

	// padStart es un método experimental, este rellena la cadena actual con un cadena dada, esta se pasa en el segundo parámetro y el primero la longitud que queremos luego del relleno
	// padStart is a experimental method, this fills the current string with a given string, this is passed in the second parameter and the first the length we want after the filling

	if (red + green > blue) {
		return `#${red.toString(16).padStart(2, "0")}${green
			.toString(16)
			.padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;
	} else {
		return getWarmColor();
	}
};

const [access_token] = getToken();

export default function Search() {
	const [artists, setArtists] = useState([]);
	const [tracks, setTracks] = useState([]);
	const [query, setQuery] = useState("");
	const [error, setError] = useState([false, null]);
	const {
		data: genres,
		err: errorGenres,
		loading: loadingGenres,
	} = useFetch(endpoints.recommendations);

	// use Effect to request the query to the API
	useEffect(() => {
		if (!query) return;

		fetch(endpoints.base + endpoints.search.tracks + query, {
			headers: {
				Authorization: `Bearer ${access_token}`,
				"Content-Type": "application/json",
			},
			method: "GET",
		})
			.then(res => {
				if (!res.ok) {
					setError([
						true,
						{
							status: res.status || "00",
							statusText:
								res.statusText || "Error in the request for the tracks",
						},
					]);
				}

				return res.json();
			})
			.then(track => {
				setTracks(track.tracks.items);
			})
			.catch(err => {
				setTracks([]);
				setArtists([]);
				setError([
					true,
					{
						status: err.status || "00",
						statusText: err.statusText || "Error in the request for the tracks",
					},
				]);

				console.error({
					err,
				});
			});

		fetch(endpoints.base + endpoints.search.artists + query, {
			headers: {
				Authorization: `Bearer ${access_token}`,
				"Content-Type": "application/json",
			},
			method: "GET",
		})
			.then(res => {
				if (!res.ok) {
					setError([
						true,
						{
							status: res.status || "00",
							statusText:
								res.statusText || "Error in the request for the artists",
						},
					]);
				}

				return res.json();
			})
			.then(artist => {
				setArtists(artist.artists.items);
			})
			.catch(err => {
				setTracks([]);
				setArtists([]);
				setError([
					true,
					{
						status: err.status || "00",
						statusText: err.statusText || "Error in the request for the tracks",
					},
				]);

				console.error({
					err,
				});
			});
	}, [query]);

	if (loadingGenres) return <div className="spinner"></div>;

	return artists.length > 1 ? (
		<>
			<Header>
				<SearchForm setQuery={setQuery} />
			</Header>

			<main>
				<h3>Artists</h3>
				<div className="container-section">
					<div className="section">
						{artists.map((el, index) => (
							<FavoriteArtists key={index} el={el} />
						))}
					</div>
				</div>

				<h3>Songs</h3>
				<table className="search-songs">
					<tbody>
						{tracks &&
							tracks.map((el, index) => <SearchSongs key={index} el={el} />)}
					</tbody>
				</table>
			</main>
		</>
	) : (
		<>
			<Header>
				<SearchForm setQuery={setQuery} />
			</Header>

			<main>
				<h2>Browse All</h2>
				<article className="genre-recommendations">
					{errorGenres && (
						<Message bgColor={"#dc3545"} color={"#fff"}>
							<h2>Sorry, an error ocurred with the genres</h2>
						</Message>
					)}
					{!error[0] &&
						genres &&
						genres.genres.slice(0, 50).map((genre, index) => (
							<a
								key={index}
								className="genre"
								style={{ backgroundColor: `${getWarmColor()}95` }}
							>
								{genre.slice(0, 1).toUpperCase()}
								{genre.slice(1)}
							</a>
						))}
					{error[0] && (
						<Message bgColor={"#dc3545"} color={"#fff"}>
							<h2>{error[1].statusText}</h2>
						</Message>
					)}
				</article>
			</main>
		</>
	);
}
