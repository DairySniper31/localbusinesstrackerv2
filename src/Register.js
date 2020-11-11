import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

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
    const [users, setUsers] = useState([]);
    const [confPassword, setConfPassword] = useState('');

    async function deleteNote({id}){
        const newUsersArray = users.filter(user => user.id !== id);
        setUsers(newUsersArray);
        await API.graphql({query: deleteUserMutation, variables: {input: {id}}})
    }

    async function fetchUsers() {
        const apiData = await API.graphql({query: listUsers});
        setUsers(apiData.data.listUsers.items);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    async function createUser() {
        console.log('Creating a user')
        console.log(userFormData)
        if (!userFormData.fname || !userFormData.lname || !userFormData.email || !userFormData.password || !confPassword || userFormData.password !== confPassword){
            return;
        }
        await API.graphql({query: createUserMutation, variables: {input: userFormData}})
        setUsers([...users, userFormData]);
        setUserFormData({
            fname: '',
            lname: '',
            email: '',
            password: '',
            bio: ''
        });
        setConfPassword('');
    }


    return (
        <div>
            <div className="w3-panel w3-center">
                <h1 className="w3-text">Register</h1>
            </div>
            <div className="w3-display-topleft" style={{marginBottom: 30}}>
                {
                    users.map(user => (
                        <div key={user.id || user.email}>
                            <h1>{user.id}</h1>
                            <h2>{user.email}</h2>
                            <h3>{user.password}</h3>
                            <h4>{user.fname} {user.lname}</h4>
                            <button onClick={() => deleteNote(user)}>Delete User</button>
                        </div>
                    ))
                }
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