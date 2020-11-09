import React from "react";

import "./w3.css";

function Home() {
	return (
		<div className="w3-row">
			<div className='w3-third w3-container'>
			</div>
			<form className="w3-third w3-panel w3-center">
				<input className="w3-input w3-border"
					   type="text"
					   id="search"
					   placeholder="Search for your favorite business"/>
				<input className="w3-button w3-border w3-green"
					   type="submit"
					   value="Search"/>
				<label className=" w3-panel w3-text-red">
					This is where the error should go
				</label>
			</form>
		</div>
	);
}

export default Home;