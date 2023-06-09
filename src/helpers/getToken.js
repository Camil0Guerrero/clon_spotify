import Login from "../components/Login";

export default function getToken() {
	if (localStorage.getItem("access_token") !== null) {
		// we will take the access token from the local storage, if it is not there it is necessary to get it
		let access_token = localStorage.getItem("access_token"),
			refresh_token = localStorage.getItem("refresh_token");

		return [access_token, refresh_token];
	} else {
		Login();
	}
}
