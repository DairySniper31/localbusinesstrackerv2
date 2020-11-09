import React from 'react';
import {Link} from "react-router-dom";

import "./w3.css";

function Login() {
    return (
        <div>
            <div className="w3-panel w3-center">
                <h1 className="w3-text">Sign In</h1>
            </div>
            <div className="w3-display-middle">
                <form className="w3-panel w3-border w3-center">
                    <input className="w3-input w3-border"
                           type={"email"}
                           id={"email"}
                           placeholder={"Email"}
                    />
                    <input className="w3-input w3-border"
                           type={"password"}
                           id={"password"}
                           placeholder={"Password"}
                    /><br/>
                    <input className="w3-button w3-border w3-blue"
                           type={"submit"}
                           value={"Login"}
                    />
                </form>
                <div className="w3-panel w3-center">
                    <label className="w3-text-red">Error goes here</label>
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