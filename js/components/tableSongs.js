const calcTime = (ms) => {
	let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60)),
		seconds = ("0" + Math.floor((ms % (1000 * 60)) / 1000)).slice(-2);
	return { minutes, seconds };
};

const calcDate = (date = null) => {
	if (!date) {
		return `<p>Fecha no encontrada</p>`;
	}

	let montNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	let day = new Date(date).getDate(),
		mount = new Date(date).getMonth(),
		year = new Date(date).getFullYear();
	return `<p>${montNames[mount]} ${day}, ${year} </p>`;
};

// This function will help us to show the songs in a table
export default async function showTable(songs = [], d = document) {
	let $tableSongs = d.querySelector(".table-songs"),
		template = "";

	// We can take the values separately from our arrays
	songs.map(({ added_at, track }) => {
		template += `
    <tr>
        <td>
          <img src="${track.album.images[0].url}" alt="${track.name}" />
          </td>
          <td>
          <a href="${track.uri}">
            <p>${track.name}</p>
          </a>
          <span>
          ${track.artists.map((el) => ` <a href="${el.uri}">${el.name.split(",")}</a>`)}
          </span>
        </td>
        <td>
          <p>${track.album.name}</p>
        </td>
        <td>
        <p>${calcDate(added_at)}</p>
        </td>
        <td> ${calcTime(track.duration_ms).minutes}:${calcTime(track.duration_ms).seconds} </td>
        </tr>
    `;
	});

	$tableSongs.innerHTML = template;
}
