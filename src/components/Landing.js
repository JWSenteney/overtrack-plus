import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Typography } from "@material-ui/core";
import { Translate } from "react-localize-redux";
import { withStyles } from "@material-ui/core/styles";

class Landing extends Component {
  render = () => {
    const { classes } = this.props;

    return (
      <Container maxWidth="md" className={classes.root}>
        <Typography variant="body1" className={classes.apiCheck}>
          <Translate id="navigation.dashboard" />
        </Typography>
      </Container>
    );
  };
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired
};

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
