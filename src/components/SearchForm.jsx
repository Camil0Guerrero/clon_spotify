import { memo, useState } from "react";

function SearchForm({ setQuery }) {
	const [form, setForm] = useState("");

	const handleClick = () => {
		document.querySelector(".animation-input input").focus();
	};

	// give me the regexp for the input

	const handleChange = e => {
		const regex = new RegExp("^([a-zA-Z0-9 áéíóúñÑ,?]+)$|^$");
		if (!regex.test(e.target.value)) {
			return;
		}

		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleKeyUp = e => {
		if (e.code === "Escape") {
			setForm({
				...form,
				query: "",
			});
			setQuery(form.query);
		} else if (e.code === "Enter") {
			setQuery(form.query);
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
	};

	return (
		<>
			<form
				className="inp-search"
				onSubmit={handleSubmit}
				onKeyUp={handleKeyUp}
				onClick={handleClick}
				autoComplete="off"
			>
				<svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor">
					<path d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zM.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7z"></path>
				</svg>
				<div className="animation-input">
					<input
						type="text"
						placeholder="What do you want to listen to?"
						name="query"
						onChange={handleChange}
						value={form.query}
					/>
					<div className="animation"></div>
				</div>
			</form>
		</>
	);
}
// No quiero que este componente se renderice cuando el usuario use el formulario
// I don't wanna that this component rendering when the user use the form
export default memo(SearchForm);
