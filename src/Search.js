import React, {useState, useEffect} from 'react';
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";

import GoogleMapReact from 'google-map-react';

import {API} from 'aws-amplify';

import "./w3.css";

import PlaceholderImg from "./placeholder.png";
import PlaceholderStar from "./star5.png";
import PlaceholderRating from "./rating5.png";

import {listBusinesss} from "./graphql/queries";

function Search() {
    const {url} = useRouteMatch();
    return (
        <div>
            <div className="w3-panel w3-center">
                <h1 className="w3-text">Search</h1>
            </div>
            <div className="w3-row">
                <div className="w3-half">
                    <Route path={`${url}/:query`}>
                        <SearchList />
                    </Route>
                </div>
                <div className="w3-half w3-panel w3-img">
                    <SimpleMap/>
                </div>
            </div>
        </div>
    );
}

function SearchList() {
    const {query} = useParams();
    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        fetchBusinesses();
    }, [])

    async function fetchBusinesses() {
        const apiData = await API.graphql({query: listBusinesss});
        setBusinesses(apiData.data.listBusinesss.items);
    }

    return (
        <div>
            <h3 className='w3-text w3-panel'>Search Results for: {query}</h3>
            <div className="w3-bar-block">
                {
                    businesses.map(business => (
                        <div key={business.name} className='w3-bar-item'>
                            <div className='w3-twothird w3-border-top w3-border-left w3-border-black'>
                                <h3 className='w3-text w3-container'>
                                    {business.name}
                                </h3>
                                <img src={PlaceholderStar} className='w3-image' alt={'Overall rating of the business'}/>
                                <p className='w3-text w3-container'>
                                    Hours: {business.hourStart} - {business.hourEnd}
                                </p>
                                <p className='w3-text w3-container'>
                                    {business.address}
                                </p>
                            </div>
                            <div className='w3-third w3-border-top w3-border-right w3-border-black'>
                                <Link to={`/business/${business.id}`}>
                                    <img src={business.image} className='w3-image' alt={'Business Logo'}/>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );

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