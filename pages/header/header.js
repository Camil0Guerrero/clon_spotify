import getDataUser from "./getDataUser.js";

export default async function jsHeader() {
	// Although at this moment this file is not very functional, do not delete it in case I add more features later
	setTimeout(() => {
		getDataUser();
	}, 300);
}
