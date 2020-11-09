import React from 'react';
import {Route, useRouteMatch, useParams} from "react-router-dom";

import "./w3.css";

const SearchPart = () => {
    const {searchQuery} = useParams();
    return (
        <div>
            <h3>
                {searchQuery}
            </h3>
        </div>
    );
}

function Search() {
    const {url} = useRouteMatch();
    return (
        <div>
            <h1>Search Page</h1>
            <Route path={`${url}/:searchQuery`}>
                <SearchPart/>
            </Route>
        </div>
    );
}

export default Search;