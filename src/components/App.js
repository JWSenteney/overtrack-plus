import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Translate, withLocalize } from "react-localize-redux";
import { CssBaseline, Typography, SvgIcon } from "@material-ui/core";

import logo from "../assets/logo.svg";
import { testApi } from "../actions";
import { languages, translations, translationOptions } from "../translations";

const Landing = () => (
  <div>
    <Typography variant="h4">
      <Translate id="overtrack_plus" />
    </Typography>
    <SvgIcon fontSize="large">
      <svg>
        <use xlinkHref={`${logo}#logo`} />
      </svg>
    </SvgIcon>
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
        <CssBaseline />
        <Router>
          <Switch>
            <Route path="/" component={Landing} />
          </Switch>
        </Router>
        <div>
          <Typography variant="body1">
            <Translate id="api_works" />:{" "}
            <Translate id={this.props.test ? "yes" : "no"} />
          </Typography>
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
