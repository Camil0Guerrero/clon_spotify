export const calcTime = ms => {
	let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60)),
		seconds = ("0" + Math.floor((ms % (1000 * 60)) / 1000)).slice(-2);
	return { minutes, seconds };
};

export const calcDate = (date = null) => {
	if (!date) {
		return <p>Date not found</p>;
	}

	let monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	let day = new Date(date).getDate(),
		mount = new Date(date).getMonth(),
		year = new Date(date).getFullYear();
	return (
		<p>
			{monthNames[mount]} {day}, {year}
		</p>
	);
};
