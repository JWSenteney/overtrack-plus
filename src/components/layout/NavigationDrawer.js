import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Divider,
  SvgIcon,
  Tabs,
  Tab,
  Toolbar,
  Typography,
  SwipeableDrawer
} from "@material-ui/core";
import { Translate } from "react-localize-redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Logo from "../Logo";
import { navigate, setDrawerOpen } from "../../actions";

const styles = theme => ({
  root: { width: 250 },
  toolbar: { justifyContent: "center" },
  logo: {
    marginRight: theme.spacing(2)
  },
  divider: {
    marginBottom: theme.spacing(2)
  },
  tab: {
    minHeight: 0,
    "& .MuiTab-wrapper": {
      flexDirection: "row",
      justifyContent: "flex-start",
      "& svg": {
        marginBottom: 0,
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(2)
      }
    }
  }
});

class NavigationDrawer extends Component {
  openDrawer = () => {
    this.props.setDrawerOpen(true);
  };

  closeDrawer = () => {
    this.props.setDrawerOpen(false);
  };

  render = () => {
    const { classes, drawerOpen } = this.props;

    return (
      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={this.closeDrawer}
        onOpen={this.openDrawer}
        className={classes.root}
      >
        <Toolbar className={classes.toolbar}>
          <SvgIcon className={classes.logo} fontSize="large">
            <Logo />
          </SvgIcon>
          <Typography variant="h6" className={classes.title}>
            <Translate id="overtrack_plus" />
          </Typography>
        </Toolbar>

        <Divider className={classes.divider} />

        {this.renderNavItems()}
      </SwipeableDrawer>
    );
  };

  renderNavItems = () => {
    const { classes, history, navigate, navItems, selectedNav } = this.props;

    const clickTab = (event, newTab) => {
      navigate(newTab);
      history.push(newTab === 0 ? "/" : `/${navItems[newTab].id}`);
    };

    return (
      <nav className={classes.root}>
        <Translate>
          {({ translate }) => (
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={selectedNav}
              onChange={clickTab}
            >
              {navItems.map(({ id, icon }) => {
                return (
                  <Tab
                    className={classes.tab}
                    key={id}
                    label={translate(`navigation.${id}`)}
                    icon={icon}
                  />
                );
              })}
            </Tabs>
          )}
        </Translate>
      </nav>
    );
  };
}

NavigationDrawer.propTypes = {
  classes: PropTypes.object,
  drawerOpen: PropTypes.bool,
  history: PropTypes.object,
  navigate: PropTypes.func,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, icon: PropTypes.object })
  ).isRequired,
  selectedNav: PropTypes.number,
  setDrawerOpen: PropTypes.func
};

NavigationDrawer = connect(
  ({ state }) => {
    return { drawerOpen: state.drawerOpen, selectedNav: state.selectedNav };
  },
  { navigate, setDrawerOpen }
)(NavigationDrawer);

NavigationDrawer = withRouter(NavigationDrawer);

NavigationDrawer = withStyles(styles, { name: "NavigationDrawer" })(
  NavigationDrawer
);

export default NavigationDrawer;
