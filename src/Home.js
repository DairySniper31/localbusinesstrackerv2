import React from "react";

import "./w3.css";

function Home() {
	return (
		<div className="w3-display-topmiddle">
			<form className="w3-container">
				<input className="w3-input w3-border" type="text" id="search" placeholder="Search for your favorite business"/>
				<input className="w3-button 3-blue" type="submit" value="Search"/>
			</form>
			<label className="w3-text-red">
				This is where the error should go
			</label>
		</div>
	);
}

export default Home;