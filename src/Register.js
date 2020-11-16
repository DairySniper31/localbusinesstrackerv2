/*
Registration Page made in React
Created by Kobe Oley

Registration creates new users that are sent to the AWS database
 */

//Imports
import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import "./w3.css";

import {API} from 'aws-amplify';

import {listUsers} from "./graphql/queries";
import {createUser as createUserMutation} from "./graphql/mutations";

//URL to get the avatar for users
const avatarURL = 'https://avatars.abstractapi.com/v1/?api_key=0d635c585cf94fb893f4497185d4486a&image_size=512&name=';

/*
Main React Register function
Contains functions essential to the registration of a user
Returns the html block for the page
 */
function Register() {
    //Variables used throughout the functions
    const [userFormData, setUserFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        bio: '',
        image: avatarURL
    });
    const [registered, setRegistered] = useState({
        success: false,
        email: '',
        password: ''
    });
    const [users, setUsers] = useState([]);
    const [confPassword, setConfPassword] = useState('');
    const [error, setError] = useState('');

    //Checks if the user exists in the current user database
    //Checks by if their email is found in one of the users, returns true if so
    function userExists(){
        const existingUsers = users.filter(user => user.email === userFormData.email)
        return existingUsers.length !== 0;
    }

    //Updates the users variable from the API
    async function fetchUsers() {
        const apiData = await API.graphql({query: listUsers});
        setUsers(apiData.data.listUsers.items);
    }

    //Use effect function calls the fetchUsers and updates the users
    useEffect(() => {
        fetchUsers();
    }, []);

    /*
    Creates a User in the database and API
    Checks whether the user is valid, sets the error if not
    If valid, creates the user using the form data
    */
    async function createUser() {
        //Checks whether all the form areas have been filled out
        if (!userFormData.fname || !userFormData.lname || !userFormData.email || !userFormData.password || !confPassword){
            setError('Fill out all parts of the form please!')
        }
        //Checks whether the fist and last name is alphanumeric
        else if (!userFormData.fname.match(/^[0-9a-zA-Z]+$/) || !userFormData.lname.match(/^[0-9a-zA-Z]+$/)){
            setError('The first and last name must be alphanumeric')
        }
        //Checks whether the password and confirmation password was filled out
        else if (userFormData.password !== confPassword) {
            setError('The passwords do not match. Make sure to type the same password')
        }
        //Checks whether the users email is already being used in the database
        else if (userExists()) {
            setError('This email is already exists. Use a different email or login to this existing email')
        }
        //Creates the user in the API and database
        else{
            //Uses the createUserMutation to create the user using userFormData
            await API.graphql({query: createUserMutation, variables: {input: userFormData}})
            //Adds the formData to the users
            setUsers([...users, userFormData]);
            //Sets the registered variables to be transferred to the confirmation page
            setRegistered({
               success: true,
               email: userFormData.email,
               password: userFormData.password
            });
            //Resets the userFormData
            setUserFormData({
                fname: '',
                lname: '',
                email: '',
                password: '',
                bio: '',
                image: avatarURL
            });
            setConfPassword('');
        }
    }

    //Redirects the page if there was a successful registration
    //Redirects to the confirmation page
    if (registered.success) {
        return (<Confirmation email={registered.email} password={registered.password}/>)
    }

    //HTML Block
    return (
        <div>
            <div className="w3-panel w3-center">
                <h1 className="w3-text">Register</h1>
            </div>
            <div className="w3-display-middle">
                <form className="w3-panel w3-border w3-center"
                      action={"."}
                      onSubmit={event => {
                          event.preventDefault()
                          createUser()
                      }}>
                    <div className="w3-bar w3-padding-16">
                        <input className="w3-bar-item w3-input w3-border"
                               type={"text"}
                               id={"fname"}
                               placeholder={"First Name"}
                               value={userFormData.fname}
                               onChange={event => setUserFormData({...userFormData,
                                   fname: event.target.value,
                                   image: avatarURL + event.target.value + "+" + userFormData.lname
                               })}
                        />
                        <input className="w3-bar-item w3-input w3-border"
                               type={"text"}
                               id={"lname"}
                               placeholder={"Last Name"}
                               value={userFormData.lname}
                               onChange={event => setUserFormData({...userFormData,
                                   lname: event.target.value,
                                   image: avatarURL + userFormData.fname + "+" + event.target.value
                               })}
                        />
                    </div>
                    <input className="w3-input w3-border"
                           type={"email"}
                           id={"email"}
                           placeholder={"Email"}
                           value={userFormData.email}
                           onChange={event => setUserFormData({...userFormData, email: event.target.value})}
                    />
                    <div className="w3-bar w3-padding-16">
                        <input className="w3-bar-item w3-input w3-border"
                               type={"password"}
                               id={"password"}
                               placeholder={"Password"}
                               value={userFormData.password}
                               onChange={event => setUserFormData({...userFormData, password: event.target.value})}
                        />
                        <input className="w3-bar-item w3-input w3-border"
                               type={"password"}
                               id={"confPassword"}
                               placeholder={"Confirm Password"}
                               value={confPassword}
                               onChange={event => setConfPassword(event.target.value)}
                        />
                    </div>
                    <br/>
                    <input className="w3-button w3-border w3-blue"
                           type={"submit"}
                           value={"Register"}
                    />
                </form>
                <div className="w3-panel w3-center">
                    <label className="w3-text-red">{error}</label>
                </div>
                <div className="w3-container w3-center">
                    <Link className="w3-text" to ="/login">
                        Already a User? Sign in here!
                    </Link>
                </div>
            </div>
        </div>
    );
}

/*
Confirmation Page
Uses the props passed in, aka email and password, to help create the HTML Block
 */
function Confirmation(props) {
    return(
        <div className="w3-container">
            <h1 className="w3-container w3-text">Thank You!</h1>
            <h2 className="w3-container w3-text">Your registration has been confirmed</h2>
            <p className="w3-container w3-text">Your can now login at:<br/>Email: {props.email}<br/>Password: {props.password}</p>
            <div className="w3-button w3-border w3-blue">
                <Link to="/login"
                      style={{textDecoration: 'none'}}
                >
                    <label>Back to Login</label>
                </Link>
            </div>
        </div>
    )
}

export default Register