import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  Link,
  SvgIcon,
  Toolbar,
  Typography
} from "@material-ui/core";
import { Translate } from "react-localize-redux";
import { connect } from "react-redux";

import Logo from "./Logo";
import { logout } from "../actions";

const styles = theme => ({
  root: { flexGrow: 1 },
  logo: {
    marginRight: theme.spacing(2)
  },
  title: { flexGrow: 1 }
});

class Header extends Component {
  render = () => {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <SvgIcon className={classes.logo} fontSize="large">
              <Logo />
            </SvgIcon>
            <Typography variant="h6" className={classes.title}>
              <Translate id="overtrack_plus" />
            </Typography>
            {this.renderAccountControls()}
          </Toolbar>
        </AppBar>
      </div>
    );
  };

  renderAccountControls = () => {
    const { user, logout } = this.props;

    const clickLogout = event => {
      event.preventDefault();
      logout();
    };

    if (user.battletag) {
      return (
        <div>
          <Typography>{user.battletag}</Typography> (
          <Link href="#" color="inherit" onClick={clickLogout}>
            <Translate id="log_out" />
          </Link>
          )
        </div>
      );
    } else {
      return (
        <div>
          <Button
            component={Link}
            href={`https://api.overtrack.gg/authenticate?next=${document.location.href}`}
          >
            <Translate id="login" />
          </Button>
        </div>
      );
    }
  };
}

Header.propTypes = {
  classes: PropTypes.object,
  logout: PropTypes.func,
  user: PropTypes.shape({
    battletag: PropTypes.string
  })
};

Header = connect(
  ({ user }) => {
    return { user };
  },
  { logout }
)(Header);

Header = withStyles(styles)(Header);

export default Header;
