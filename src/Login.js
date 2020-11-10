import React, {useState} from 'react';
import {Link, Redirect} from "react-router-dom";

import "./w3.css";

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [login, setLogin] = useState(false);

    function loginUser() {
        if (email === 'User123@rit.edu' && password === 'admin'){
            setLogin(true);
            setError('');
        }
        else{
            setLogin(false);
            setError('The email must be User123@rit.edu and the password must be admin')
        }
        setEmail('');
        setPassword('');
    }

    if (login){
        return (<Redirect to={"/profile"}/>)
    }

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