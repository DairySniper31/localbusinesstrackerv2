/*
Login Page made in React
Created by Kobe Oley

Login authorizes users from the AWS database to their profile page
Redirects them to their Profile page if so
 */

//Imports
import React, {useState, useEffect} from 'react';
import {Link, Redirect} from "react-router-dom";

import "./w3.css";

import {listUsers} from "./graphql/queries";
import {API} from "aws-amplify";

/*
Main Login Function
Contains the logic for the login as well as the HTML Block
 */
function Login() {
    //Sets up variables to be used in the page
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [login, setLogin] = useState(false);

    /*
    Logs in the User
    Checks if the user login was valid, returns an error if not
    If valid, sets the session id to be the user id
     */
    function loginUser() {
        //Checks whether email and password were given
        if (!email || !password) {
            setError('Email and password must be given');
        }
        //Checks whether the user's email exists
        else if (!userExists()) {
            setError('This email is not assigned to any user. Use a different email or create a user');
        }
        //Checks whether the user's password was correct
        else if (!findUser()) {
            setError('This password to the email is incorrect. Try again');
        }
        //Sets the id in the session to be the user ID
        else {
            sessionStorage.setItem('id', getID());
            setLogin(true);
        }
    }

    //Gets the ID from the email and password given
    function getID() {
        const existingUsers = users.filter(user => (user.email === email && user.password === password))
        return existingUsers[0].id
    }

    //Checks whether the user exists with the given email and password
    function findUser() {
        const existingUsers = users.filter(user => (user.email === email && user.password === password))
        return existingUsers.length !== 0;
    }

    //Checks whether the user exists with the given email
    function userExists() {
        const existingUsers = users.filter(user => user.email === email)
        return existingUsers.length !== 0;
    }

    //Updates the users from the API database
    async function fetchUsers() {
        const apiData = await API.graphql({query: listUsers});
        setUsers(apiData.data.listUsers.items);
    }

    //Use effect is used to fetchUsers
    useEffect(() => {
        fetchUsers()
    }, [])

    //If a session has an ID, then redirect the page to the profile page
    if (login || (sessionStorage.getItem('id') != null && sessionStorage.getItem('id') !== 'null')){
        return (<Redirect to={"/profile"}/>)
    }

    //HTML Block
    return (
        <div>
            <div className="w3-panel w3-center">
                <h1 className="w3-text">Sign In</h1>
            </div>
            <div className="w3-display-middle">
                <form className="w3-panel w3-border w3-center"
                      action={"."}
                      onSubmit={event => {
                          event.preventDefault();
                          loginUser();
                      }}
                >
                    <input className="w3-input w3-border"
                           type={"email"}
                           id={"email"}
                           placeholder={"Email"}
                           value={email}
                           onChange={event => setEmail(event.target.value)}
                    />
                    <input className="w3-input w3-border"
                           type={"password"}
                           id={"password"}
                           placeholder={"Password"}
                           value={password}
                           onChange={event => setPassword(event.target.value)}
                    /><br/>
                    <input className="w3-button w3-border w3-blue"
                           type={"submit"}
                           value={"Login"}
                    />
                </form>
                <div className="w3-panel w3-center">
                    <label className="w3-text-red">{error}</label>
                </div>
                <div className="w3-container w3-center">
                    <Link className="w3-text" to ="/register">
                        New User? Sign up here!
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login