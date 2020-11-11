import React, {useState, useEffect} from 'react';
import {Link, Redirect} from "react-router-dom";

import "./w3.css";

import {API} from 'aws-amplify';

import {listUsers} from "./graphql/queries";
import {createUser as createUserMutation, deleteUser as deleteUserMutation} from "./graphql/mutations";


function Register() {
    const [userFormData, setUserFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        bio: ''
    });
    const [registered, setRegistered] = useState({
        success: false,
        email: 'tester@gmail',
        password: 'tester'
    });
    const [users, setUsers] = useState([]);
    const [confPassword, setConfPassword] = useState('');
    const [error, setError] = useState('');

    function userExists(){
        const existingUsers = users.filter(user => user.email === userFormData.email)
        return existingUsers.length !== 0;
    }

    async function fetchUsers() {
        const apiData = await API.graphql({query: listUsers});
        setUsers(apiData.data.listUsers.items);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    async function createUser() {
        if (!userFormData.fname || !userFormData.lname || !userFormData.email || !userFormData.password || !confPassword){
            setError('Fill out all parts of the form please!')
        }
        else if (!userFormData.fname.match(/^[0-9a-zA-Z]+$/) || !userFormData.lname.match(/^[0-9a-zA-Z]+$/)){
            setError('The first and last name must be alphanumeric')
        }
        else if (userFormData.password !== confPassword) {
            setError('The passwords do not match. Make sure to type the same password')
        }
        else if (userExists()) {
            setError('This email is already exists. Use a different email or login to this existing email')
        }
        else{
            await API.graphql({query: createUserMutation, variables: {input: userFormData}})
            setUsers([...users, userFormData]);
            setRegistered({
               success: true,
               email: userFormData.email,
               password: userFormData.password
            });
            setUserFormData({
                fname: '',
                lname: '',
                email: '',
                password: '',
                bio: ''
            });
            setConfPassword('');
        }
    }

    if (registered.success) {
        return (<Confirmation email={registered.email} password={registered.password}/>)
    }


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
                               onChange={event => setUserFormData({...userFormData, fname: event.target.value})}
                        />
                        <input className="w3-bar-item w3-input w3-border"
                               type={"text"}
                               id={"lname"}
                               placeholder={"Last Name"}
                               value={userFormData.lname}
                               onChange={event => setUserFormData({...userFormData, lname: event.target.value})}
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

function Confirmation(props) {
    return(
        <div className="w3-container">
            <h1 className="w3-container w3-text">Thank You!</h1>
            <h2 className="w3-container w3-text">Your registration has been confirmed</h2>
            <p className="w3-container w3-text">Your can now login at:<br/>Email: {props.email}<br/>Password: {props.password}</p>
            <div className="w3-button w3-border w3-blue">
                <Link to="/login">
                    <label>Back to Login</label>
                </Link>
            </div>
        </div>
    )
}

export default Register