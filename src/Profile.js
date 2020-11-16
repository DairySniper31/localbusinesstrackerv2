/*
Profile Page made in React
Created by Kobe Oley

The Profile page is to model the user's information, as well as display reviews made
 */

//Imports
import React, {useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";

import "./w3.css";

import PlaceholderImg from "./placeholder.png";

import {API} from 'aws-amplify';
import {getUser, listReviews} from "./graphql/queries";
import {updateUser} from "./graphql/mutations";

/*
Profile function, contains logic and return statement
 */
function Profile() {
    //Variables
    const [currentUser, setCurrentUser] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        bio: '',
        image: PlaceholderImg
    });
    const [reviews, setReviews] = useState([])

    //Logs the user out by removing the session storage attribute
    function logout() {
        sessionStorage.setItem('id', 'null');
    }

    //Gets information from the API
    async function fetchUsers() {
        const userData = await API.graphql({query: getUser, variables: {id: sessionStorage.getItem('id')}})
        if (userData.data.getUser)
            setCurrentUser(userData.data.getUser)

        const reviewData = await API.graphql({query: listReviews});
        if (reviewData.data) {
            const allReviews = reviewData.data.listReviews.items
            setReviews(allReviews.filter(review => review.userID === sessionStorage.getItem("id")))
        }
    }

    //Updates the page
    useEffect(() => {
        fetchUsers()
    }, [])

    //If the user isn't logged in, then they are redirected to the home page
    if (sessionStorage.getItem('id') == null || sessionStorage.getItem('id') === 'null'){
        return (<Redirect to={"/login"}/>)
    }

    //Main HTML Block
    return (
        <div className="w3-row">
            <div className="w3-third">
                <h1 className="w3-container w3-text">
                    {currentUser.fname} {currentUser.lname}
                </h1>
                <img src={currentUser.image} className="w3-panel w3-image" alt={"User Avatar"}/>
                <div className="w3-panel w3-text w3-light-gray">
                    <h4>User Info:</h4>
                    <p>Total Reviews: {reviews.length}</p>
                    <Bio bio={currentUser.bio}/>
                </div>

            </div>
            <div className="w3-half">
                <h2 className="w3-container w3-text">
                    Reviews:
                </h2>
                <div className='w3-bar-block'>
                    {
                        reviews.map(review => (
                            <div key={review.rating} className='w3-bar-item w3-panel'>
                                <div className="w3-quarter">
                                    <Link to={`/business/${review.businessID}`}>
                                        <img src={review.businessImage} className="w3-image" alt={'User profile pic'}/>
                                    </Link>
                                </div>
                                <div className="w3-quarter w3-xxlarge">
                                    {review.rating}/5
                                </div>
                                <div className="w3-half">
                                    <p className="w3-text">
                                        {review.description}
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="w3-rest w3-panel">
                <button className="w3-button w3-border w3-blue"
                >
                    <Link to="/login"
                          onClick={logout}
                          style={{textDecoration: 'none'}}
                    >
                        Logout
                    </Link>
                </button>
            </div>
        </div>
    );
}

//Bio function shows the editing of the bio
function Bio(props) {
    const [editBio, setEditBio] = useState(false);
    const [newBio, setNewBio] = useState('')

    async function saveBio() {
        console.log('Is this getting called')
        await API.graphql({query: updateUser, variables: {input: {id: sessionStorage.getItem('id'), bio: newBio}}})
        setEditBio(false)
    }

    async function fetchUsers() {
        const userData = await API.graphql({query: getUser, variables: {id: sessionStorage.getItem('id')}})
        if (userData.data.getUser)
            setNewBio(userData.data.getUser.bio)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    if (editBio) {
        return (
            <form className="w3-panel"
                  action={"."}
                  onSubmit={event => {
                      event.preventDefault();
                      saveBio();
                  }}
            >
                <label id={'Bio'}>User Bio:</label>
                <textarea className="w3-text w3-white w3-border"
                          placeholder={props.bio}
                          value={newBio}
                          id={'Bio'}
                          onChange={event => setNewBio(event.target.value)}
                />
                <input type={'submit'}
                       className='w3-button w3-blue w3-border'
                       value={'Save Bio'}
                />
            </form>
        );
    }
    else {
        return(
            <form className="w3-panel"
                  action={"."}
                  onSubmit={event => {
                      event.preventDefault()
                      setEditBio(true);
                  }}
            >
                <label id={'Bio'}>User Bio:</label>
                <p className="w3-text"
                          id={'Bio'}
                >
                    {newBio}
                </p>
                <input type={'submit'}
                       className='w3-button w3-blue w3-border'
                       value={'Edit Bio'}
                />
            </form>
        );
    }
}

export default Profile;