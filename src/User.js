import React, {useEffect, useState} from "react";
import {Link, Redirect, Route, useParams, useRouteMatch} from "react-router-dom";

import "./w3.css";

import PlaceholderImg from "./placeholder.png";
import PlaceholderRating from "./rating5.png";
import {API} from "aws-amplify";
import {getUser, listReviews} from "./graphql/queries";

function User() {
    const {url} = useRouteMatch();
    return (
        <div>
            <Route path={`${url}/:id`}>
                <UserPage/>
            </Route>
        </div>
    );
}

function UserPage() {
    const {id} = useParams();
    const [userData, setUserData] = useState({
        id: '',
        fname: '',
        lname: '',
        email: '',
        password: '',
        bio: '',
        image: ''
    });
    const [reviews, setReviews] = useState([]);

    async function fetchUser () {
        const userData = await API.graphql({query: getUser, variables: {id: id}})
        if (userData.data.getUser)
            setUserData(userData.data.getUser)

        const reviewData = await API.graphql({query: listReviews});
        if (reviewData.data) {
            const allReviews = reviewData.data.listReviews.items
            setReviews(allReviews.filter(review => review.userID === id))
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    if (id === sessionStorage.getItem('id'))
        return (<Redirect to={"/profile"}/>)

    return (
        <div className="w3-row">
            <div className="w3-third">
                <h1 className="w3-container w3-text">
                    {userData.fname} {userData.lname}
                </h1>
                <img src={userData.image} className="w3-panel w3-image" alt={"User Avatar"}/>
                <div className="w3-panel w3-text w3-light-gray">
                    <h4>User Info:</h4>
                    <p>Total Reviews: {reviews.length}</p>
                    <label id={'Bio'}>User Bio:</label>
                    <p className="w3-text"
                       id={'Bio'}
                    >
                        {userData.bio}
                    </p>
                </div>

            </div>
            <div className="w3-half">
                <h2 className="w3-container w3-text">
                    Reviews:
                </h2>
                <div className='w3-bar-block'>
                    {
                        reviews.map(review => (
                            <div key={review.rating} className='w3-bar-item w3-panel'>
                                <div className="w3-quarter">
                                    <Link to={`/business/${review.businessID}`}>
                                        <img src={review.businessImage} className="w3-image" alt={'User profile pic'}/>
                                    </Link>
                                </div>
                                <div className="w3-quarter w3-xxlarge">
                                    {review.rating}/5
                                </div>
                                <div className="w3-half w3-large">
                                    <p className="w3-text">
                                        {review.description}
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default User;