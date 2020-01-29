import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Typography } from "@material-ui/core";
import { Translate } from "react-localize-redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import { testApi } from "../store/test";

class Landing extends Component {
  render = () => {
    const { classes, test } = this.props;
    return (
      <Container maxWidth="md" className={classes.root}>
        <Typography variant="body1" className={classes.apiCheck}>
          <Translate id="api_works" />: <Translate id={test ? "yes" : "no"} />
        </Typography>
      </Container>
    );
  };

  componentDidMount = () => {
    this.props.testApi();
  };
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
  test: PropTypes.bool.isRequired,
  testApi: PropTypes.func.isRequired
};

Landing = connect(({ test }) => ({ test }), { testApi })(Landing);

Landing = withStyles(
  theme => ({
    root: { marginTop: theme.spacing(2) },
    apiCheck: {
      textAlign: "center"
    }
  }),
  { name: "Landing" }
)(Landing);

export default Landing;
