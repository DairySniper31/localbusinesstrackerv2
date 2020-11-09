import React from 'react';
import { Link, Route, Switch} from "react-router-dom";

import './w3.css';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const Covid = () => (
  <div>
    <h2>Covid</h2>
  </div>
);

const Search = () => (
  <div>
    <h2>Search</h2>
  </div>
);

const Categories = () => (
  <div>
    <h2>Categories</h2>
  </div>
);

const Login = () => (
  <div>
    <h2>Login</h2>
  </div>
);

function App() {
  return (
    <div className="w3-container">
      <header className="w3-bar w3-white">
        <div className="w3-bar-item">
          <Link to="/">Home</Link>
        </div>
        <div className="w3-bar-item">
          <Link to="/covid">COVID-19 Information</Link>
        </div>
        <div className="w3-bar-item">
          <Link to="/search">Search</Link>
        </div>
        <div className="w3-bar-item">
          <Link to="/categories">Categories</Link>
        </div>
        <div className="w3-bar-item">
          <Link to="/login">Login/Sign-up</Link>
        </div>
      </header>

      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/covid"><Covid /></Route>
        <Route path="/search"><Search /></Route>
        <Route path="/categories"><Categories /></Route>
        <Route path="/login"><Login /></Route>
      </Switch>
    </div>
  );
}

export default App;
