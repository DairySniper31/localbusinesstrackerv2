import React, {useState, useEffect} from 'react';
import {Link, Redirect} from "react-router-dom";

import "./w3.css";

import {listUsers} from "./graphql/queries";
import {API} from "aws-amplify";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [login, setLogin] = useState(false);

    function loginUser() {
        if (!email || !password) {
            setError('Email and password must be given')
        }
        else if (!userExists()) {
            setError('This email is not assigned to any user.\nUse a different email or create a user');
        }
        else if (!findUser()) {
            setError('This password to the email is incorrect. Try again');
        }
        else {
            console.log('Success logging')
            sessionStorage.setItem('id', getID())
            setLogin(true);
        }
    }

    function getID() {
        const existingUsers = users.filter(user => (user.email === email && user.password === password))
        return existingUsers[0].id
    }

    function findUser() {
        const existingUsers = users.filter(user => (user.email === email && user.password === password))
        return existingUsers.length !== 0;
    }
    function userExists() {
        const existingUsers = users.filter(user => user.email === email)
        return existingUsers.length !== 0;
    }

    async function fetchUsers() {
        const apiData = await API.graphql({query: listUsers});
        setUsers(apiData.data.listUsers.items);
        users.map(user => (console.log(user)))
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    if (login || (sessionStorage.getItem('id') != null && sessionStorage.getItem('id') !== '')){
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