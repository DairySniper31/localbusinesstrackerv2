/*
Main SPA Page made in React
Created by Kobe Oley

Main App contains all of the other pages.
Also creates the header that is used to navigate that program
 */

//Imports
import React, {useState, useEffect} from 'react';
import {Link, Route, Switch} from "react-router-dom";

import Home from "./Home";
import Covid from "./Covid";
import Search from "./Search";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import Business from "./Business";
import User from "./User";

import './w3.css';

/*
Main App function hat displays the other pages and header
 */
function App() {
    //Variable to tell the header whether the user is logged in or not
    const [loginTab, setLoginTab] = useState('Login/Sign-up')

    //Fetches info on whether the user is logged in
    async function fetchInfo() {
        //If the key exists then the login tab is my profile. If not, it's login/sign up
        if (sessionStorage.getItem('id') != null && sessionStorage.getItem('id') !== 'null'){
            setLoginTab('My Profile')
        }
        else {
            setLoginTab('Login/Sign-up')
        }
    }

    //Updates teh page hen refreshed or component is shown
    useEffect(() => {
        fetchInfo()
    }, [])

    //HTML block for the main app
    return (
        <div>
            <header className="w3-bar w3-large w3-white">
                <Link className="w3-bar-item w3-button w3-mobile"
                      to="/"
                      style={{textDecoration: 'none', width: '20%'}}>
                    Home
                </Link>
                <Link className="w3-bar-item w3-button w3-mobile"
                      to="/covid"
                      style={{textDecoration: 'none', width: '20%'}}>
                    COVID-19 Information
                </Link>
                <Link className="w3-bar-item w3-button w3-mobile"
                      to="/search/ "
                      style={{textDecoration: 'none', width: '20%'}}>
                    Search
                </Link>
                <div className="w3-dropdown-hover w3-mobile" style={{width: '20%'}}>
                    <button className="w3-button" style={{width: '100%'}}>Categories</button>
                    <div className="w3-dropdown-content w3-bar-block w3-card-4" style={{width: '20%'}}>
                        <a className="w3-bar-item w3-button w3-center"
                              href="/search/retail">
                            Retail
                        </a>
                        <a className="w3-bar-item w3-button w3-center"
                              href="/search/food">
                            Food
                        </a>
                        <a className="w3-bar-item w3-button w3-center"
                              href="/search/salon">
                            Salon
                        </a>
                        <a className="w3-bar-item w3-button w3-center"
                              href="/search/other">
                            Other
                        </a>
                    </div>
                </div>
                <Link className="w3-bar-item w3-button w3-mobile"
                      to="/login"
                      style={{textDecoration: 'none', width: '20%'}}>
                    {loginTab}
                </Link>
            </header>
            <div className="w3-container">
                <Switch>
                    <Route exact path="/"><Home/></Route>
                    <Route path="/covid"><Covid/></Route>
                    <Route path="/search"><Search/></Route>
                    <Route path="/login"><Login/></Route>
                    <Route path="/register"><Register/></Route>
                    <Route path="/profile"><Profile/></Route>
                    <Route path="/business"><Business/></Route>
                    <Route path="/user"><User/></Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;
