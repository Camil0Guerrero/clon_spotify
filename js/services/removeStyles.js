export default async function removeStyles(d = document) {
	// Remove the CSS of the others pages

	if (d.querySelector(`link[href*="liked"]`)) {
		let style = d.querySelector(`link[href*="liked"]`);
		style.remove();
	}

	if (d.querySelector(`link[href*="search"]`)) {
		let style = d.querySelector(`link[href*="search"]`);
		style.remove();
	}

	if (d.querySelector(`link[href*="your"]`)) {
		let style = d.querySelector(`link[href*="your"]`);
		style.remove();
	}
}
