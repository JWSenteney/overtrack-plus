import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PropTypes from "prop-types";
import { withLocalize } from "react-localize-redux";
import { CssBaseline } from "@material-ui/core";
import { connect } from "react-redux";

import { languages, translations, translationOptions } from "../translations";
import Layout from "./layout/Layout";
import { fetchUser } from "../store/account";

class App extends Component {
  render = () => {
    return (
      <div className="App">
        <CssBaseline />
        <Router>
          <Layout />
        </Router>
      </div>
    );
  };

  constructor(props) {
    super(props);

    this.initTranslations();
  }

  componentDidMount = () => {
    this.props.fetchUser();
  };

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
}

App.propTypes = {
  addTranslationForLanguage: PropTypes.func,
  fetchUser: PropTypes.func,
  initialize: PropTypes.func
};

App = withLocalize(App);

App = connect(null, { fetchUser })(App);

export default App;
