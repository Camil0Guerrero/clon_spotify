import { calcTime } from "../helpers/calcTime.jsx";

function SearchSongs({ el }) {
	return (
		<tr>
			<td>
				{el.album.images[0].url ? (
					<img src={el.album.images[0].url} alt={el.name} />
				) : (
					"No image"
				)}
			</td>
			<td>
				<p>{el.name}</p>
				<h4>{el.artists[0].name}</h4>
			</td>
			<td>
				{calcTime(el.duration_ms).minutes}:{calcTime(el.duration_ms).seconds}
			</td>
		</tr>
	);
}

export default SearchSongs;
