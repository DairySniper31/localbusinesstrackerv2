import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {API} from 'aws-amplify';
import {createBusiness as createBusinessMutation} from "./graphql/mutations";

import "./w3.css";

function Home() {
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

	function getRandomInt() {
		return Math.floor(Math.random() * Math.floor(1085))
	}

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

	async function createBusiness() {
		console.log(businessData)

		await API.graphql({query: createBusinessMutation, variables: {input: businessData}})
	}

	if (search) {
		return (
			<Redirect to={"/search/" + query} />
		);
	}

	return (
		<div>
			<div className="w3-third">
				<form className="w3-panel w3-border w3-center"
					  action={"."}
					  onSubmit={event => {
						  event.preventDefault()
						  createBusiness()
					  }}>
					<input className="w3-input w3-border"
						   type={"text"}
						   placeholder={"Business Name"}
						   value={businessData.name}
						   onChange={event => setBusinessData({
							   ...businessData,
							   name: event.target.value,
							   image: `https://picsum.photos/id/${getRandomInt()}/500`
						   })}
					/>
					<input className="w3-input w3-border"
						   type={"text"}
						   placeholder={"Business Address"}
						   value={businessData.address}
						   onChange={event => setBusinessData({
							   ...businessData,
							   address: event.target.value
						   })}
					/>
					<input className="w3-input w3-border"
						   type={"text"}
						   placeholder={"Business Website"}
						   value={businessData.website}
						   onChange={event => setBusinessData({
							   ...businessData,
							   website: event.target.value
						   })}
					/>
					<input className="w3-input w3-border"
						   type={"text"}
						   placeholder={"Business Phone Number"}
						   value={businessData.phone}
						   onChange={event => setBusinessData({
							   ...businessData,
							   phone: event.target.value
						   })}
					/>
					<input className="w3-input w3-border"
						   type={"text"}
						   placeholder={"Business Start Hours"}
						   value={businessData.hourStart}
						   onChange={event => setBusinessData({
							   ...businessData,
							   hourStart: parseInt(event.target.value)
						   })}
					/>
					<input className="w3-input w3-border"
						   type={"text"}
						   placeholder={"Business End Hours"}
						   value={businessData.hourEnd}
						   onChange={event => setBusinessData({
							   ...businessData,
							   hourEnd: parseInt(event.target.value)
						   })}
					/>
					<input className="w3-input w3-border"
						   type={"text"}
						   placeholder={"Business Category"}
						   value={businessData.category}
						   onChange={event => setBusinessData({
							   ...businessData,
							   category: event.target.value
						   })}
					/>
					<textarea className="w3-input w3-border"
						   placeholder={"Business Regulations"}
						   value={businessData.regulations}
						   onChange={event => setBusinessData({
							   ...businessData,
							   regulations: event.target.value
						   })}
					/>
					<input className="w3-button w3-border"
						   type={'submit'}
						   value={"Register Business"}
					/>
				</form>
			</div>
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