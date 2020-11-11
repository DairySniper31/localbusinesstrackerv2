import React from "react";
import {Link} from "react-router-dom";

import "./w3.css";

import PlaceholderImg from "./placeholder.png";
import PlaceholderRating from "./rating5.png";

function Profile() {
    console.log(sessionStorage.getItem('id'))
    return (
        <div className="w3-row">
            <div className="w3-third">
                <h1 className="w3-container w3-text">
                    User123
                </h1>
                <img src={PlaceholderImg} className="w3-image w3-container" alt={'User profile pic'}/>
                <div className="w3-panel w3-text w3-light-gray">
                    <h4>User Info:</h4>
                    <p>Total Reviews: 4</p>
                    <p>User Bio: Eat Pray Love!</p>
                    <p>Testing out all of the ice cream stores in Rochester</p>
                </div>

            </div>
            <div className="w3-half">
                <h2 className="w3-container w3-text">
                    Reviews:
                </h2>
                <Review  name={'sundaes'}
                         imgsrc={PlaceholderImg}
                         ratesrc={PlaceholderRating}
                         ratetext={'User123 Rating:' +
                         'This local has the best homemade ice cream and very nice workers.' +
                         '10/10 would recommend checking it out'}
                />
                <Review name={'gales'}
                        imgsrc={PlaceholderImg}
                        ratesrc={PlaceholderRating}
                        ratetext={"User123 Rating: " +
                        "Of all the local shops, I wouldn't make this one my first choice. " +
                        "It used to be a lot better!"}
                />
                <Review name={'smiling'}
                        imgsrc={PlaceholderImg}
                        ratesrc={PlaceholderRating}
                        ratetext={"User123 Rating: " +
                        "This local shop has okay homemade ice cream, but the workers are kind!"}
                />
            </div>
        </div>
    );
}

function Review(props) {
    return (
        <div className="w3-row-padding">
            <div className="w3-quarter">
                <Link to={'/business/' + props.name + ''}>
                    <img src={props.imgsrc} className="w3-image" alt={'Business logo'}/>
                </Link>
            </div>
            <div className="w3-quarter">
                <img src={props.ratesrc} className="w3-image" alt={'Review Rating'}/>
            </div>
            <div className="w3-half">
                <p className="w3-text">
                    {props.ratetext}
                </p>
            </div>
        </div>
    )
}

export default Profile;