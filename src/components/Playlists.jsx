export default function Playlists({ el }) {
	return (
		<a href={el.tracks.href}>
			<img src={el.images[0].url} alt={el.name} />
			<p>{el.name}</p>
		</a>
	);
}
