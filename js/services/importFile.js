let options = {
	method: "GET",
	headers: {
		"Content-Type": "text/html; charset=utf-8",
	},
};

export default async function importFile(name) {
	// With this file it would no longer be necessary to load the entire page again to show other content, however it is necessary to improve it
	// This method has a maximum capacity of files of around 1.5kb
	try {
		const res = await fetch(`pages/${name}/${name}.html`, options),
			html = await res.text();

		if (!res.ok) {
			throw { status: res.status, statusText: res.statusText };
		}

		return await html;
	} catch (err) {
		console.log(`Error al traer el archivo con fetch ${err}`);
	}
}
