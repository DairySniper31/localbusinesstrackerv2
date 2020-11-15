import React, {useEffect, useState} from "react";
import {useParams, Route, Link, useRouteMatch} from "react-router-dom";

import {API} from 'aws-amplify';

import "./w3.css";

import PlaceholderImg from "./placeholder.png";
import PlaceholderStar from "./star5.png";
import PlaceholderRating from "./rating5.png";

import {getBusiness, listBusinesss, listReviews} from "./graphql/queries";

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

function BusinessPage() {
    const {id} = useParams();
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

    async function fetchResources() {
        const reviewData = await API.graphql({query: listReviews});
        if (reviewData.data) {
            const allReviews = reviewData.data.listReviews.items
            setReviews(allReviews.filter(review => review.businessID === id))
        }

        const businessAPI = await API.graphql({query: getBusiness, variables: {id: id}})
        console.log(businessAPI.data)
        if (businessAPI.data) {
            setBusinessData(businessAPI.data.getBusiness);
        }
    }

    useEffect(() => {
        fetchResources();
    }, [])

    return (
        <div className="w3-row">
            <div className="w3-quarter">
                <img src={businessData.image} className="w3-image w3-panel" alt={'Business logo'}/>
                <div className="w3-panel w3-text">
                    <h4>Current Rating</h4>
                    <img src={PlaceholderStar} className="w3-image w3-container" alt={'Four Star Rating'}/>
                </div>
                <Rating/>
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
            </div>
        </div>
    );
}

function Review(props) {
    return (
        <div className="w3-row-padding">
            <div className="w3-quarter">
                <Link to={'/profile'}>
                    <img src={PlaceholderImg} className="w3-image" alt={'User profile pic'}/>
                </Link>
            </div>
            <div className="w3-quarter">
                <img src={props.ratesrc} className="w3-image" alt={'Rating of review'}/>
            </div>
            <div className="w3-half">
                <p className="w3-text">
                    {props.ratetext}
                </p>
            </div>
        </div>
    )
}

function Rating() {
    let text = ''
    let rate = 0
    return(
        <form className="w3-panel"
              action={"."}
              onSubmit={event => {
                  event.preventDefault()
              }}
        >
            <textarea rows={5} cols={50}
                      className="w3-input w3-border"
                      onChange={event => text = event.target.value}
            >
                Type Your Review Here, then click on the stars to rate the shop!
            </textarea>
            <div className="rate">
                <input type="radio" id="star5" name="rate" value="5"
                       onClick={event => rate = 5}/>
                <label htmlFor="star5" title="text">5 stars</label>
                <input type="radio" id="star4" name="rate" value="4"
                       onClick={event => rate = 4}
                />
                <label htmlFor="star4" title="text">4 stars</label>
                <input type="radio" id="star3" name="rate" value="3"
                       onClick={event => rate = 3}
                />
                <label htmlFor="star3" title="text">3 stars</label>
                <input type="radio" id="star2" name="rate" value="2"
                       onClick={event => rate = 2}
                />
                <label htmlFor="star2" title="text">2 stars</label>
                <input type="radio" id="star1" name="rate" value="1"
                       onClick={event => rate = 1}
                />
                <label htmlFor="star1" title="text">1 star</label>
            </div>
            <input className="w3-button w3-border w3-blue"
                   type={"submit"}
                   value={"Submit Review"}
            />
        </form>
    )
}

export default Business