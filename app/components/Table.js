import { calcDate, calcTime } from "../../../app/helpers/calcTime.js";

// This function will help us to show the songs in a table
export default function Table(songs = []) {
	let tableHtml = "";

	// We can take the values separately from our arrays
	songs.forEach(({ added_at, track }) => {
		tableHtml += `
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
        <td>
          ${calcTime(track.duration_ms).minutes}:${calcTime(track.duration_ms).seconds} 
        </td>
      </tr>
    `;
	});

	return tableHtml;
}
