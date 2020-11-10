import React from "react";
import {Switch, Route, Link} from "react-router-dom";

import "./w3.css";

import PlaceholderImg from "./placeholder.png";
import PlaceholderStar from "./star5.png";
import PlaceholderRating from "./rating5.png";

function Business() {
    return (
        <Switch>
            <Route path="/business/sundaes">
                <Sundaes />
            </Route>
            <Route path="/business/gales">
                <Gales/>
            </Route>
            <Route path="/business/smiling">
                <Smiling/>
            </Route>
        </Switch>
    );
}

function Sundaes() {
    var reviews = [{
        name: 'User123',
        text: 'This local has the best homemade ice cream and very nice workers.' +
            '10/10 would recommend checking it out',
        rate: 5
    }
    ]
    return (
        <div className="w3-row">
            <div className="w3-quarter">
                <img src={PlaceholderImg} className="w3-image w3-container" alt={'Sundae logo'}/>
                <div className="w3-panel w3-text">
                    <h4>Current Rating</h4>
                    <img src={PlaceholderStar} className="w3-image w3-container" alt={'Four Star Rating'}/>
                </div>
                <Rating/>
            </div>
            <div className="w3-half w3-text w3-center">
                <h1>
                    Sundaes on Sundays
                </h1><br/>
                <h4>
                    123 Sunday Street, Rochester NY 14623
                </h4><br/>
                <p>
                    Open Weekdays and Weekends: 8am-8pm
                </p>
                <p>
                    sundaesonsunday.com  (585) 123-4567
                </p><br/>
                <h2>
                    COVID-19 Regulations:
                </h2>
                <p>
                    We ask that you always wear a mask unless eating ice cream!
                </p>
                <p>
                    Follow social distancing signs
                </p>
                <p>
                    Limited Capacity Inside: 15
                </p>
                <p>
                    Go to sundaesonsunday.com for more protocols!
                </p>
            </div>
            <div className="w3-quarter">
                <h2 className="w3-container w3-text">
                    Reviews
                </h2>
                <Review ratesrc={PlaceholderRating} ratetext={reviews[0].text}/>
            </div>
        </div>
    )
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

function Gales() {
    const reviews = [{
        name: 'User123',
        text: "Of all the local shops, I wouldn't make this one my first choice. It used to be a lot better!",
        rate: 2
    }
    ];
    return (
        <div className="w3-row">
            <div className="w3-quarter">
                <img src={PlaceholderImg} className="w3-image w3-container" alt={"Gale's Logo"}/>
                <div className="w3-panel w3-text">
                    <h4>Current Rating</h4>
                    <img src={PlaceholderStar} className="w3-image w3-container" alt={'Current Rating'}/>
                </div>
                <Rating/>
            </div>
            <div className="w3-half w3-text w3-center">
                <h1>
                    Gale’s Ice Cream
                </h1><br/>
                <h4>
                    12 Lonely Drive, Rochester NY 14623
                </h4><br/>
                <p>
                    Open Weekdays and Weekends: 8am-5pm
                </p>
                <p>
                    (585) 674-4853
                </p><br/>
                <h2>
                    COVID-19 Regulations:
                </h2>
                <p>
                    Follow NY State social distancing guidelines
                </p>
                <p>
                    Please always have a mask
                </p>
                <p>
                    To-go orders only
                </p>
                <p>
                    Call for more protocols!
                </p>
            </div>
            <div className="w3-quarter">
                <h2 className="w3-container w3-text">
                    Reviews
                </h2>
                <Review ratesrc={PlaceholderRating} ratetext={reviews[0].text}/>
            </div>
        </div>
    )
}

function Smiling() {
    var reviews = [{
        name: 'User123',
        text: "This local shop has okay homemade ice cream, but the workers are kind!",
        rate: 3
    }
    ]
    return (
        <div className="w3-row">
            <div className="w3-quarter">
                <img src={PlaceholderImg} className="w3-image w3-container" alt={'Smiling logo'}/>
                <div className="w3-panel w3-text">
                    <h4>Current Rating</h4>
                    <img src={PlaceholderStar} className="w3-image w3-container" alt={'Three star rating'}/>
                </div>
                <Rating/>
            </div>
            <div className="w3-half w3-text w3-center">
                <h1>
                    The Smiling Scoop
                </h1><br/>
                <h4>
                    321 Business Road, Rochester NY 14623
                </h4><br/>
                <p>
                    Open Weekdays and Weekends: 11am-8pm
                </p>
                <p>
                    Smilingscoop.net (585) 987-6543
                </p><br/>
                <h2>
                    COVID-19 Regulations:
                </h2>
                <p>
                    Masks needed when at the ordering area!
                </p>
                <p>
                    Outside areas only!
                </p>
                <p>
                    Follow NY State social distancing guidelines
                </p>
                <p>
                    Go to Smilingscoop.com for more protocols!
                </p>
            </div>
            <div className="w3-quarter">
                <h2 className="w3-container w3-text">
                    Reviews
                </h2>
                <Review ratesrc={PlaceholderRating} ratetext={reviews[0].text}/>
            </div>
        </div>
    )
}

export default Business