import React from 'react';
import {Link, Route, Switch} from "react-router-dom";

import Home from "./Home";
import Covid from "./Covid";

import './w3.css';

const Search = () => (
    <div>
        <h2>Search</h2>
    </div>
);

const Categories = () => (
    <div>
        <h2>Categories</h2>
    </div>
);

const Login = () => (
    <div>
        <h2>Login</h2>
    </div>
);

function App() {
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
                      to="/search"
                      style={{textDecoration: 'none', width: '20%'}}>
                    Search
                </Link>
                <div className="w3-dropdown-hover w3-mobile" style={{width: '20%'}}>
                    <button className="w3-button" style={{width: '100%'}}>Categories</button>
                    <div className="w3-dropdown-content w3-bar-block w3-card-4" style={{width: '20%'}}>
                        <Link className="w3-bar-item w3-button w3-center"
                              to="/search/retail">
                            Retail
                        </Link>
                        <Link className="w3-bar-item w3-button w3-center"
                              to="/search/food">
                            Food
                        </Link>
                        <Link className="w3-bar-item w3-button w3-center"
                              to="/search/salon">
                            Salon
                        </Link>
                        <Link className="w3-bar-item w3-button w3-center"
                              to="/search/other">
                            Other
                        </Link>
                    </div>
                </div>
                <Link className="w3-bar-item w3-button w3-mobile"
                      to="/login"
                      style={{textDecoration: 'none', width: '20%'}}>
                    Login/Sign-up
                </Link>
            </header>
            <div className="w3-container">
                <Switch>
                    <Route exact path="/"><Home/></Route>
                    <Route path="/covid"><Covid/></Route>
                    <Route path="/search"><Search/></Route>
                    <Route path="/categories"><Categories/></Route>
                    <Route path="/login"><Login/></Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;
