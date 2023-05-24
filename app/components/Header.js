import { endpoints } from "../assets/data.js";
import FetchApi from "../helpers/FetchApi.js";

export default async function Header() {
	let me = await FetchApi(endpoints.me),
		iconOpen = `
			<path d="m14 6-6 6-6-6h12z"></path>
		`;

	document.addEventListener("click", (e) => {
		let $accountOptions = document.querySelector(".content-menu-profile"),
			iconClose = `
			<path d="M14 10 8 4l-6 6h12z"></path>
		`,
			iconOpen = `
			<path d="m14 6-6 6-6-6h12z"></path>
		`;

		if (e.target.matches(".information-user *")) {
			if ($accountOptions.classList.contains("none")) {
				$accountOptions.classList.remove("none");
				document.querySelector(".information-user-icon").innerHTML = iconClose;
			} else {
				$accountOptions.classList.add("none");
				document.querySelector(".information-user-icon").innerHTML = iconOpen;
			}
		}
	});

	return `
	<header>
		<div class="header">
			<article class="content-header">
				<section class="btn-previous-next">
					<button class="previous"></button>

					<button class="next"></button>
				</section>

				<section class="core-content"></section>

				<section class="information-user">
					<button type="button">
						<img src="${me.images[0].url}" alt="${me.display_name}" />
						<span>${me.display_name}</span>
						<svg 
							class="information-user-icon" 
							height="16" 
							width="16" 
							fill="currentColor" 
							viewBox="0 0 16 16">
    						${iconOpen}
    				</svg>
					</button>
				</section>

				<div class="content-menu-profile none">
					<ul>
						<li>
							<p>Account</p>
						</li>

						<li><p>Profile</p></li>

						<li>
							<p>Update to premium</p>
						</li>

						<li><p>Settings</p></li>

						<li><p>Log out</p></li>
					</ul>
				</div>
			</article>
		</div>
	</header>
	`;
}
