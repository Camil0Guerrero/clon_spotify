async function getTitle() {
	let today = new Date(),
		time = today.toLocaleTimeString(),
		hour = time.slice(0, 2),
		template = "";

	if (hour >= 0 && hour < 12) {
		template = `<h2>Good Morning</h2>`;
	} else if (hour >= 12 && hour <= 19) {
		template = `<h2>Good Afternoon</h2>`;
		console.log(template);
	} else {
		template = `<h2>Good Night</h2>`;
	}

	return await template;
}

export default async function main(d = document) {
	const title = d.querySelector(".title-main");
	title.innerHTML = await getTitle();
}
