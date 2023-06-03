import Device from "./components/Device.jsx";
import setIcons from "./helpers/setIcons.js";
import Main from "./components/Main.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import NavMenu from "./components/NavMenu.jsx";
import "./assets/css/style.css";
import LikedSongs from "./components/LikedSongs.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./components/Search.jsx";
import YourLibrary from "./components/YourLibrary.jsx";
import searchParams from "./helpers/searchParams.js";

export default function App() {
	return (
		<>
			<Footer />
			<Header />

			<BrowserRouter>
				<NavMenu />
				<Routes>
					<Route
						path="/"
						element={
							<>
								<Main />
								{searchParams()}
								<Device />

								{setTimeout(() => {
									setIcons();
								}, 2000)}
							</>
						}
					/>
					<Route
						path="/search"
						element={
							<>
								<Search />
								{setIcons()}
							</>
						}
					/>

					<Route
						path="/liked-songs"
						element={
							<>
								<LikedSongs />
								{setIcons()}
							</>
						}
					/>
					<Route
						path="/your-library"
						element={
							<>
								<YourLibrary />
								{setIcons()}
							</>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}
