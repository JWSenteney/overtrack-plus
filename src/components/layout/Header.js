import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  Hidden,
  Link,
  Menu,
  MenuItem,
  SvgIcon,
  Tab,
  Tabs,
  Toolbar,
  Typography
} from "@material-ui/core";
import { ArrowDropDown } from "@material-ui/icons";
import { Translate } from "react-localize-redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Logo from "../Logo";
import { logout, navigate } from "../../actions";

const styles = theme => ({
  toolbarLeft: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center"
  },
  logo: {
    marginRight: theme.spacing(2)
  },
  title: { marginRight: theme.spacing(4) },
  topNav: {
    "& button": {
      minHeight: theme.mixins.toolbar["@media (min-width:600px)"].minHeight
    }
  }
});

class Header extends Component {
  state = { anchorEl: null };

  render = () => {
    const { classes } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <div className={classes.toolbarLeft}>
            <SvgIcon className={classes.logo} fontSize="large">
              <Logo />
            </SvgIcon>
            <Typography variant="h6" className={classes.title}>
              <Translate id="overtrack_plus" />
            </Typography>
            {this.renderNavTabs()}
          </div>
          {this.renderAccountControls()}
        </Toolbar>
      </AppBar>
    );
  };

  renderNavTabs = () => {
    const { classes, history, navItems } = this.props;

    const clickTab = (event, newTab) => {
      this.props.navigate(newTab);
      history.push(newTab === 0 ? "/" : `/${navItems[newTab].id}`);
    };

    return (
      <Hidden smDown>
        <nav className={classes.topNav}>
          <Translate>
            {({ translate }) => (
              <Tabs value={this.props.selectedNav} onChange={clickTab}>
                {navItems.map(tab => (
                  <Tab label={translate(`navigation.${tab.id}`)} key={tab.id} />
                ))}
              </Tabs>
            )}
          </Translate>
        </nav>
      </Hidden>
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
  history: PropTypes.object,
  logout: PropTypes.func,
  navigate: PropTypes.func,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, icon: PropTypes.object })
  ).isRequired,
  selectedNav: PropTypes.number,
  user: PropTypes.shape({
    battletag: PropTypes.string
  })
};

Header = connect(
  ({ account, state }) => {
    return { user: account.user, selectedNav: state.selectedNav };
  },
  { logout, navigate }
)(Header);

Header = withRouter(Header);

Header = withStyles(styles)(Header);

export default Header;
