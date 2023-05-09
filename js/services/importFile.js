let options = {
	method: "GET",
	headers: {
		"Content-Type": "text/html; charset=utf-8",
	},
};

export default async function importFile(name) {
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
