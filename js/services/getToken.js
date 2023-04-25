export default function getToken() {
	if (localStorage.getItem("access_token") !== null) {
		let access_token = localStorage.getItem("access_token"),
			refresh_token = localStorage.getItem("refresh_token");

		return [access_token, refresh_token];
	} else {
		window.location.href = "http://127.0.0.1:5500/login.html";
	}
}
