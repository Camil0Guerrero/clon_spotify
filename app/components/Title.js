export default function Title() {
	// Show a different greeting depending on the time of day
	let today = new Date(),
		time = today.toLocaleTimeString(),
		hour = time.slice(0, 2),
		template = "";

	if (hour >= 0 && hour < 12) {
		template = `Good Morning`;
	} else if (hour >= 12 && hour <= 19) {
		template = `Good Afternoon`;
	} else {
		template = `Good Night`;
	}

	return template;
}
