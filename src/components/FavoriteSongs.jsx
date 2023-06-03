function FavoriteSongs({ el }) {
	return (
		<figure>
			<div className="container-img-figure">
				<img src={el.album.images[0].url} alt={el.name} />

				<button className="play center" data-id={el.id}></button>
			</div>

			<h4>{el.name}</h4>
			<p>{el.artists[0].name}</p>
		</figure>
	);
}

export default FavoriteSongs;
