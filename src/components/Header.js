import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, SvgIcon, Typography } from "@material-ui/core";
import { Translate } from "react-localize-redux";

import logo from "../assets/logo.svg";

const styles = theme => ({
  root: { flexGrow: 1 },
  logo: {
    marginRight: theme.spacing(2)
  },
  title: { flexGrow: 1 }
});

const Header = ({ classes }) => {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <SvgIcon className={classes.logo} fontSize="large">
            <svg>
              <use xlinkHref={`${logo}#logo`} />
            </svg>
          </SvgIcon>
          <Typography variant="h6" className={classes.title}>
            <Translate id="overtrack_plus" />
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
