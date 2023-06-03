import { endpoints } from "../assets/data.js";
import Footer from "./Footer.jsx";
import useFetch from "../hooks/useFetch.jsx";
import setIcons from "../helpers/setIcons.js";

export default function Device() {
	const { data: devices } = useFetch(endpoints.meDevices);

	if (!devices) return;

	return (
		<>
			<Footer informationSong={devices.item} device={devices} />
			{setIcons()}
		</>
	);
}
