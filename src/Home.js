/*
Home Page made in React
Created by Kobe Oley

The home page in the application
Contains a simple search query form for use
 */

//Imports
import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {API} from 'aws-amplify';
import {createBusiness as createBusinessMutation} from "./graphql/mutations";

import "./w3.css";

/*
Home function, contains logic and HTML block for the page
 */
function Home() {
	//Variables to be used, business was used temporarily
	const [query, setQuery] = useState('');
	const [search, setSearch] = useState(false);
	const [error, setError] = useState('');
	const [businessData, setBusinessData] = useState({
		name: '',
		address: '',
		website: '',
		phone: '',
		hourStart: 0,
		hourEnd: 0,
		category: 'Other',
		image: 'https://picsum.photos/500',
		regulations: ''
	});

	//Gets a random integer between 0 and 1085
	function getRandomInt() {
		return Math.floor(Math.random() * Math.floor(1085))
	}

	//Submits a search and redirects the user to the search page
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

	//Creates a business using a form that was deleted
	async function createBusiness() {
		console.log(businessData)

		await API.graphql({query: createBusinessMutation, variables: {input: businessData}})
	}

	//If the user has searched, then you are redirected to the search page
	if (search) {
		return (
			<Redirect to={"/search/" + query} />
		);
	}

	//Main HTML Block
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