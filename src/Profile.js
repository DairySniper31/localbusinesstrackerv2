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
import PlaceholderRating from "./rating5.png";

import {API} from 'aws-amplify';
import {getUser} from "./graphql/queries";
import {updateUser} from "./graphql/mutations";

function Profile() {
    const [currentUser, setCurrentUser] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        bio: ''
    });

    function logout() {
        sessionStorage.setItem('id', 'null');
    }

    async function fetchUsers() {
        const userData = await API.graphql({query: getUser, variables: {id: sessionStorage.getItem('id')}})
        if (userData.data.getUser)
            setCurrentUser(userData.data.getUser)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    if (sessionStorage.getItem('id') == null || sessionStorage.getItem('id') === 'null'){
        return (<Redirect to={"/login"}/>)
    }

    return (
        <div className="w3-row">
            <div className="w3-third">
                <h1 className="w3-container w3-text">
                    {currentUser.fname} {currentUser.lname}
                </h1>
                <img src={PlaceholderImg} className="w3-image w3-container" alt={'User profile pic'}/>
                <div className="w3-panel w3-text w3-light-gray">
                    <h4>User Info:</h4>
                    <p>Total Reviews: 4</p>
                    <Bio bio={currentUser.bio}/>
                </div>

            </div>
            <div className="w3-half">
                <h2 className="w3-container w3-text">
                    Reviews:
                </h2>
                <Review  name={'sundaes'}
                         imgsrc={PlaceholderImg}
                         ratesrc={PlaceholderRating}
                         ratetext={'User123 Rating:' +
                         'This local has the best homemade ice cream and very nice workers.' +
                         '10/10 would recommend checking it out'}
                />
                <Review name={'gales'}
                        imgsrc={PlaceholderImg}
                        ratesrc={PlaceholderRating}
                        ratetext={"User123 Rating: " +
                        "Of all the local shops, I wouldn't make this one my first choice. " +
                        "It used to be a lot better!"}
                />
                <Review name={'smiling'}
                        imgsrc={PlaceholderImg}
                        ratesrc={PlaceholderRating}
                        ratetext={"User123 Rating: " +
                        "This local shop has okay homemade ice cream, but the workers are kind!"}
                />
            </div>
            <div className="w3-rest">
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

function Review(props) {
    return (
        <div className="w3-row-padding">
            <div className="w3-quarter">
                <Link to={'/business/' + props.name + ''}>
                    <img src={props.imgsrc} className="w3-image" alt={'Business logo'}/>
                </Link>
            </div>
            <div className="w3-quarter">
                <img src={props.ratesrc} className="w3-image" alt={'Review Rating'}/>
            </div>
            <div className="w3-half">
                <p className="w3-text">
                    {props.ratetext}
                </p>
            </div>
        </div>
    )
}

export default Profile;