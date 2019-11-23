import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { withLocalize } from "react-localize-redux";
import { CssBaseline } from "@material-ui/core";

import { languages, translations, translationOptions } from "../translations";
import Header from "./Header";
import Landing from "./Landing";

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

  render = () => {
    return (
      <div className="App">
        <CssBaseline />
        <Header />
        <Router>
          <Switch>
            <Route path="/" component={Landing} />
          </Switch>
        </Router>
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

App = withLocalize(App);

export default App;
