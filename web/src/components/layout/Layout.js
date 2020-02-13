import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import { Home as HomeIcon, List as ListIcon } from "@material-ui/icons";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import Header from "./Header";
import Landing from "../Landing";
import { initNav } from "../../store/state";
import NavigationDrawer from "./NavigationDrawer";
import GamesList from "../games_list/GamesList";

const navItems = [
  { id: "dashboard", icon: <HomeIcon />, component: Landing, default: true },
  { id: "games", icon: <ListIcon />, component: GamesList }
];

class Layout extends Component {
  render = () => {
    const { classes } = this.props;

    return (
      <div>
        <Header navItems={navItems} />

        <NavigationDrawer navItems={navItems} />

        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            {navItems.map(navItem => {
              return (
                <Route
                  exact
                  path={navItem.default ? "/" : `/${navItem.id}`}
                  component={navItem.component}
                  key={navItem.id}
                />
              );
            })}

            <Route path="/" component={Landing} />
          </Switch>
        </Container>
      </div>
    );
  };

  componentDidMount = () => {
    const { initNav, history } = this.props;
    initNav(history.location.pathname, navItems);
  };
}

Layout.propTypes = {
  children: PropTypes.object,
  classes: PropTypes.object,
  history: PropTypes.object,
  initNav: PropTypes.func
};

Layout = connect(null, { initNav })(Layout);

Layout = withRouter(Layout);

Layout = withStyles(
  theme => ({
    container: { marginTop: theme.spacing(2) }
  }),
  { name: "Layout" }
)(Layout);

export default Layout;
