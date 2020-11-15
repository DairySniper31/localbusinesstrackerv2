import React, {useState} from "react";
import {Redirect} from "react-router-dom";

import "./w3.css";

function Home() {
	const [query, setQuery] = useState('');
	const [search, setSearch] = useState(false);
	const [error, setError] = useState('');

	function submitSearch() {
		if (!query) {
			setError('You must search a term')
		}
		else if(!query.match(/^[0-9a-zA-Z ]+$/)) {
			setError('All searches must be alphanumeric')
		}
		else {
			setSearch(true);
		}
	}

	if (search) {
		return (
			<Redirect to={"/search/" + query} />
		);
	}

	return (
		<div>
			<div className='w3-panel w3-center'>
				<h1 className="w3-text">
					Welcome to the Local Business Tracker
				</h1>
			</div>
			<div className="w3-display-middle">
				<form className="w3-panel w3-border w3-center"
					  action={"."}
					  onSubmit={event => {
					  	event.preventDefault();
					  	submitSearch()
					  }}
				>
					<input className="w3-input w3-border"
						   type={"text"}
						   value={query}
						   placeholder={"Search for your favorite business"}
						   onChange={event => setQuery(event.target.value)}
					/>
					<input className="w3-button w3-border w3-green"
						   type={"submit"}
						   value={"Search"}
					/>
				</form>
				<div className="w3-panel w3-center">
					<label className="w3-text-red">{error}</label>
				</div>
			</div>
		</div>
	);
}

export default Home;