import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

const Landing = () => <div>OverTrack+</div>;

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
