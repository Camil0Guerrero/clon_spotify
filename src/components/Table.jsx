import { calcDate, calcTime } from "../helpers/calcTime";

// This function will help us to show the songs in a table
export default function Table({ el }) {
	const { added_at, track } = el;
	return (
		<>
			<tr>
				<td>
					<img src={track.album.images[0].url} alt={track.name} />
				</td>
				<td>
					<a href={track.uri}>
						<p>{track.name}</p>
					</a>
					<span>
						{track.artists.map((el, index) => (
							<a href={el.uri} key={index}>
								{el.name}
							</a>
						))}
					</span>
				</td>
				<td>
					<p>{track.album.name}</p>
				</td>
				<td>{calcDate(added_at)}</td>
				<td>
					{calcTime(track.duration_ms).minutes}:
					{calcTime(track.duration_ms).seconds}
				</td>
			</tr>
		</>
	);
}
