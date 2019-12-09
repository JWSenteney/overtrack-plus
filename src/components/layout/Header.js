import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  Link,
  Menu,
  MenuItem,
  SvgIcon,
  Toolbar,
  Typography
} from "@material-ui/core";
import { ArrowDropDown } from "@material-ui/icons";
import { Translate } from "react-localize-redux";
import { connect } from "react-redux";

import Logo from "../Logo";
import { logout } from "../../actions";

const styles = theme => ({
  root: { flexGrow: 1 },
  logo: {
    marginRight: theme.spacing(2)
  },
  title: { flexGrow: 1 }
});

class Header extends Component {
  componentDidMount = () => {
    this.setState({ anchorEl: null });
  };

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

    const clickMenu = event => {
      setAnchorEl(event.currentTarget);
    };

    const clickLogout = () => {
      closeMenu();
      logout();
    };

    const setAnchorEl = element => {
      this.setState({ anchorEl: element });
    };

    const closeMenu = () => {
      setAnchorEl(null);
    };

    if (user.battletag) {
      return (
        <div>
          <Button
            aria-controls="account-controls-menu"
            aria-haspopup="true"
            onClick={clickMenu}
          >
            {user.battletag} <ArrowDropDown />
          </Button>
          <Menu
            id="account-controls-menu"
            keepMounted
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
            onClose={closeMenu}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={clickLogout}>
              <Translate id="log_out" />
            </MenuItem>
          </Menu>
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
  ({ account }) => {
    return { user: account.user };
  },
  { logout }
)(Header);

Header = withStyles(styles)(Header);

export default Header;
