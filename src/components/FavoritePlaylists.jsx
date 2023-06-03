function FavoritePlaylists({ el }) {
	return (
		<div>
			<img
				src={el.images[0].url}
				alt={`Image of the playlist named ${el.name}`}
			/>

			<div className="content-card">
				<p>{el.name}</p>
				<button className="play center"></button>
			</div>
		</div>
	);
}

export default FavoritePlaylists;
