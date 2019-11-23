import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import logo from "../assets/logo.svg";
import { testApi } from "../actions";

const Landing = () => (
  <div>
    OverTrack+
    <svg height="50" width="50">
      <use xlinkHref={`${logo}#logo`} />
    </svg>
  </div>
);

class App extends Component {
  componentDidMount = () => {
    this.props.testApi();
  };

  render = () => {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" component={Landing} />
          </Switch>
        </Router>
        <div>API Works?: {this.props.test ? "YES" : "NO!"}</div>
      </div>
    );
  };
}

App.propTypes = {
  test: PropTypes.bool,
  testApi: PropTypes.func
};

App = connect(
  ({ test }) => {
    return { test };
  },
  { testApi }
)(App);

export default App;
