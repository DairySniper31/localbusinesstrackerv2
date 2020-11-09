import React from 'react';
import {Link} from "react-router-dom";

import GoogleMapReact from 'google-map-react';

import "./w3.css";

import PlaceholderImg from "./placeholder.png";
import PlaceholderStar from "./star5.png";

function Search() {
    return (
        <div>
            <div className="w3-panel w3-center">
                <h1 className="w3-text">Search</h1>
            </div>
            <div className="w3-row">
                <div className="w3-half w3-panel w3-border">
                    <h2 className="w3-text">Search Results: Ice Cream</h2>
                    <div className='w3-bar-block'>
                        <Business name={'Sundaes On Sundays'}
                                  imgsrc={PlaceholderImg}
                                  ratesrc={PlaceholderStar}
                                  hours={'Hours: 8am-8pm'}
                                  address={'123 Sunday Street, Rochester NY 14623'}
                                  url={'/business/sundaes'}
                        />
                        <Business name={'The Smiling Scoop'}
                                  imgsrc={PlaceholderImg}
                                  ratesrc={PlaceholderStar}
                                  hours={'Hours: 11am-8pm'}
                                  address={'321 Business Road, Rochester NY 14623'}
                                  url={'/business/smiling'}
                        />
                        <Business name={"Gale's Ice Cream"}
                                  imgsrc={PlaceholderImg}
                                  ratesrc={PlaceholderStar}
                                  hours={'Hours: 8am-5pm'}
                                  address={'12 Lonely Drive, Rochester NY 14623'}
                                  url={'/business/gales'}
                        />
                    </div>
                </div>
                <div className="w3-half w3-panel w3-img">
                    <SimpleMap/>
                </div>
            </div>
        </div>
    );
}

function Business(props) {
    return(
        <div className='w3-bar-item'>
            <div className='w3-threequarter'>
                <h3 className='w3-text'>
                    {props.name}
                </h3>
                <img src={props.ratesrc} className='w3-image' alt={'Overall rating of the business'}/>
                <p className='w3-text'>
                    {props.hours}
                </p>
                <p className='w3-text'>
                    {props.address}
                </p>
            </div>
            <div className='w3-quarter'>
                <Link to={props.url} >
                    <img src={props.imgsrc} className='w3-image' alt={'Business Logo'}/>
                </Link>
            </div>
        </div>
    )
}

function SimpleMap() {
    return (
        <div style={{height: '100vh', width: '100%'}}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyATxDEY-PbeclUr3zQbSYNByl3gEkv6IEQ'}}
                defaultCenter={{lat: 43.08, lng: -77.67}}
                defaultZoom={13}
            >
            </GoogleMapReact>
        </div>
    );
}

export default Search;