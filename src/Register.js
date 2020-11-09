import React from 'react';
import {Link} from "react-router-dom";

import "./w3.css";

function Register() {
    return (
        <div>
            <div className="w3-panel w3-center">
                <h1 className="w3-text">Register</h1>
            </div>
            <div className="w3-display-middle">
                <form className="w3-panel w3-border w3-center">
                    <div className="w3-bar w3-padding-16">
                        <input className="w3-bar-item w3-input w3-border"
                               type={"text"}
                               id={"fname"}
                               placeholder={"First Name"}
                        />
                        <input className="w3-bar-item w3-input w3-border"
                               type={"text"}
                               id={"lname"}
                               placeholder={"Last Name"}
                        />
                    </div>
                    <input className="w3-input w3-border"
                           type={"email"}
                           id={"email"}
                           placeholder={"Email"}
                    />
                    <div className="w3-bar w3-padding-16">
                        <input className="w3-bar-item w3-input w3-border"
                               type={"password"}
                               id={"password"}
                               placeholder={"Password"}
                        />
                        <input className="w3-bar-item w3-input w3-border"
                               type={"password"}
                               id={"confPassword"}
                               placeholder={"Confirm Password"}
                        />
                    </div>
                    <br/>
                    <input className="w3-button w3-border w3-blue"
                           type={"submit"}
                           value={"Register"}
                    />
                </form>
                <div className="w3-panel w3-center">
                    <label className="w3-text-red">Error goes here</label>
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

export default Register