import React, {useState} from "react";

import "./w3.css";

function Home() {
	const[query, setQuery] = useState('');

	return (
		<div>
			<div className='w3-panel w3-center'>
				<h1 className="w3-text">
					Welcome to the Local Business Tracker
				</h1>
			</div>
			<div className="w3-display-middle">
				<form className="w3-panel w3-border w3-center">
					<input className="w3-input w3-border"
						   type={"text"}
						   id={"search"}
						   placeholder={"Search for your favorite business"}
					/>
					<input className="w3-button w3-border w3-green"
						   type={"submit"}
						   value={"Search"}
					/>
				</form>
				<div className="w3-panel w3-center">
					<label className="w3-text-red">Error goes here</label>
				</div>
			</div>
		</div>
	);
}

export default Home;