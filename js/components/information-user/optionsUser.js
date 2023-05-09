export default function optionsUser(e, d = document) {
	let $accountOptions = d.querySelector(".content-menu-profile"),
		iconClose = `
			<path d="M14 10 8 4l-6 6h12z"></path>
		`,
		iconOpen = `
			<path d="m14 6-6 6-6-6h12z"></path>
		`;

	if (e.target.matches(".information-user *")) {
		if ($accountOptions.classList.contains("none")) {
			$accountOptions.classList.remove("none");
			d.querySelector(".information-user-icon").innerHTML = iconClose;
		} else {
			$accountOptions.classList.add("none");
			d.querySelector(".information-user-icon").innerHTML = iconOpen;
		}
	}
}
