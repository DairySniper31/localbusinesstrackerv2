/*
Main SPA Page made in React
Created by Kobe Oley

Main App contains all of the other pages.
Also creates the header that is used to navigate that program
 */

//Imports
import React, {useEffect, useState} from "react";
import {useParams, Route, Link, useRouteMatch} from "react-router-dom";

import {API} from 'aws-amplify';

import "./w3.css";
import "./Business.css"

import PlaceholderImg from "./placeholder.png";
import PlaceholderStar from "./star5.png";

import {getBusiness, getUser, listReviews} from "./graphql/queries";
import {createReview} from "./graphql/mutations";

//Business function that moves the route to the business page
function Business() {
    const {url} = useRouteMatch();
    return (
        <div>
            <Route path={`${url}/:id`}>
                <BusinessPage/>
            </Route>
        </div>
    );
}

/*
Business Page that shows a specific business
 */
function BusinessPage() {
    //Variable that is given from the url
    const {id} = useParams();

    //Data about the business and the variables for the page
    const [businessData, setBusinessData] = useState({
        id: '',
        address: '',
        category: '',
        hourEnd: 0,
        hourStart: 0,
        image: '',
        name: '',
        phone: '',
        regulations: '',
        website: ''
    });
    const [reviews, setReviews] = useState([]);
    const [text, setText] = useState('')
    const [error, setError] = useState('')
    const [rating, setRating] = useState(0);

    //Gets information about the variables above from the API
    async function fetchResources() {
        const reviewData = await API.graphql({query: listReviews});
        console.log(reviewData.data.listReviews.items.filter(review => review.businessID === id))
        if (reviewData.data) {
            const allReviews = reviewData.data.listReviews.items
            setReviews(allReviews.filter(review => review.businessID === id))
        }

        const businessAPI = await API.graphql({query: getBusiness, variables: {id: id}})
        if (businessAPI.data) {
            setBusinessData(businessAPI.data.getBusiness);
        }
    }

    //Creates a review. The user must be logged in and the rating and text must be filled in
    //Then this makes a new review and pushed it to the API
    async function createReviewSubmission() {
        if (sessionStorage.getItem('id') == null || sessionStorage.getItem('id') === 'null') {
            setError('You must login into an account in order to make reviews')
        }
        else if (!text || rating === 0) {
            setError('You must set a rating and description for the review')
        }
        else {
            const userData = await API.graphql({query: getUser, variables: {id: sessionStorage.getItem('id')}})
            const newReview = {
                businessID: id,
                userID: sessionStorage.getItem('id'),
                rating: rating,
                description: text,
                userImage: userData.data.getUser.image,
                businessImage: businessData.image
            }
            await API.graphql({query: createReview, variables: {input: newReview}})

            setReviews([...reviews, newReview]);
            setText('');
        }
    }

    //Updates from user updates and component loading
    useEffect(() => {
        fetchResources();
    }, [])

    //HTML Block for the business pages
    return (
        <div className="w3-row">
            <div className="w3-quarter">
                <img src={businessData.image} className="w3-image w3-panel" alt={'Business logo'}/>
                <div className="w3-panel w3-text">
                    <h4>Current Rating</h4>
                    <img src={PlaceholderStar} className="w3-image w3-container" alt={'Four Star Rating'}/>
                </div>
                <form className="w3-panel"
                      action={"."}
                      onSubmit={event => {
                          event.preventDefault()
                          createReviewSubmission()
                      }}>
                    <textarea rows={5} cols={50}
                      className="w3-input w3-border"
                      onChange={event => setText(event.target.value)}
                      placeholder={'Type Your Review Here, then click on the stars to rate the shop!'}/>
                    <div className="rate">
                        <input type="radio" id="star5" name="rate" value="5" onChange={() => {
                            setRating(5);
                        }}/>
                        <label htmlFor="star5" title="text">5 stars</label>

                        <input type="radio" id="star4" name="rate" value="4" onChange={() => {
                            setRating(4);
                        }}/>
                        <label htmlFor="star4" title="text">4 stars</label>

                        <input type="radio" id="star3" name="rate" value="3" onChange={() => {
                            setRating(3);
                        }}/>
                        <label htmlFor="star3" title="text">3 stars</label>

                        <input type="radio" id="star2" name="rate" value="2" onChange={() => {
                            setRating(2);
                        }}/>
                        <label htmlFor="star2" title="text">2 stars</label>

                        <input type="radio" id="star1" name="rate" value="1" onChange={() => {
                            setRating(1);
                        }}/>
                        <label htmlFor="star1" title="text">1 star</label>
                    </div>
                    <br/>
                    <input className="w3-button w3-border w3-blue"
                           type={"submit"}
                           value={"Submit Review"}
                    />
                </form>
                <div className="w3-panel w3-center">
                    <label className="w3-text-red">{error}</label>
                </div>
            </div>
            <div className="w3-half w3-text w3-center">
                <h1>
                    {businessData.name}
                </h1><br/>
                <h4>
                    {businessData.address}
                </h4><br/>
                <p>
                    Open Weekdays and Weekends: {businessData.hourStart} - {businessData.hourEnd}
                </p>
                <p>
                    {businessData.website} {businessData.phone}
                </p><br/>
                <h2>
                    COVID-19 Regulations:
                </h2>
                <p>
                    {businessData.regulations}
                </p>
            </div>
            <div className="w3-quarter">
                <h2 className="w3-container w3-text">
                    Reviews
                </h2>
                <div className='w3-bar-block'>
                    {
                        reviews.map(review => (
                            <div key={review.rating} className='w3-bar-item w3-panel'>
                                <div className="w3-quarter">
                                    <Link to={`/user/${review.userID}`}>
                                        <img src={review.userImage} className="w3-image" alt={'User profile pic'}/>
                                    </Link>
                                </div>
                                <div className="w3-quarter w3-xxlarge">
                                    {review.rating}/5
                                </div>
                                <div className="w3-half">
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

export default Business