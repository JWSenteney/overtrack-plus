import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import logo from "../assets/logo.svg";

const Landing = () => (
  <div>
    OverTrack+
    <svg height="50" width="50">
      <use xlinkHref={`${logo}#logo`} />
    </svg>
  </div>
);

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Landing} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
