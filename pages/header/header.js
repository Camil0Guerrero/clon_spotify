import getDataUser from "../../js/components/information-user/getDataUser.js";

export default async function jsHeader() {
	setTimeout(() => {
		getDataUser();
	}, 300);
}
