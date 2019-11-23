import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Translate, withLocalize } from "react-localize-redux";

import logo from "../assets/logo.svg";
import { testApi } from "../actions";
import { languages, translations, translationOptions } from "../translations";

const Landing = () => (
  <div>
    <Translate id="overtrack_plus" />
    <svg height="50" width="50">
      <use xlinkHref={`${logo}#logo`} />
    </svg>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);

    this.initTranslations();
  }

  initTranslations = () => {
    this.props.initialize({
      languages,
      options: translationOptions
    });

    languages.forEach(language => {
      this.props.addTranslationForLanguage(
        translations[language.code],
        language.code
      );
    });
  };

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
        <div>
          <Translate id="api_works" />:{" "}
          <Translate id={this.props.test ? "yes" : "no"} />
        </div>
      </div>
    );
  };
}

App.propTypes = {
  addTranslationForLanguage: PropTypes.func,
  initialize: PropTypes.func,
  test: PropTypes.bool,
  testApi: PropTypes.func
};

App = connect(
  ({ test }) => {
    return { test };
  },
  { testApi }
)(App);

App = withLocalize(App);

export default App;
