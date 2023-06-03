import { endpoints } from "../assets/data.js";
import useFetch from "../hooks/useFetch.jsx";
import "../assets/css/header.css";
import { useState } from "react";
import UserOptionsMenu from "./UserOptionsMenu.jsx";

export default function Header({ children }) {
	const [showMenu, setShowMenu] = useState(false);
	const { data: meData, err, loading } = useFetch(endpoints.me);

	// useEffect to add content in the core of the header
	const handleClickProfile = () => {
		if (showMenu) {
			setShowMenu(false);
		} else {
			setShowMenu(true);
		}
	};

	return (
		<>
			<header>
				<div className="header">
					<article className="content-header">
						<section className="btn-previous-next">
							<button className="previous"></button>

							<button className="next"></button>
						</section>

						<section className="core-content">{children}</section>

						<section className="information-user">
							<button type="button" onClick={handleClickProfile}>
								{loading && <div className="spinner"></div>}
								{err && <span>Ups!</span>}
								{meData && (
									<>
										<img src={meData.images[0].url} alt={meData.display_name} />
										<span>{meData.display_name}</span>
									</>
								)}
								<svg
									className="information-user-icon"
									height="16"
									width="16"
									fill="currentColor"
									viewBox="0 0 16 16"
								>
									{showMenu ? (
										<path d="M14 10 8 4l-6 6h12z"></path>
									) : (
										<path d="m14 6-6 6-6-6h12z"></path>
									)}
								</svg>
							</button>
						</section>
					</article>
					{showMenu && <UserOptionsMenu />}
				</div>
			</header>
		</>
	);
}
