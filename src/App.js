import React from 'react';
import { Link, Route, Switch} from "react-router-dom";

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

function App() {
  return (
    <div>
      <header>
        <h1>This is the beginning of the actual app. Lets hope if this works</h1>
      </header>
      <Route exact path="/"><Home /> </Route>
    </div>
  );
}

export default App;
