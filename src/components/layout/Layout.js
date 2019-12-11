import React, { Component } from "react";
import PropTypes from "prop-types";
import { Home as HomeIcon, List as ListIcon } from "@material-ui/icons";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./Header";
import Landing from "../Landing";
import { initNav } from "../../actions";
import NavigationDrawer from "./NavigationDrawer";

const navItems = [
  { id: "dashboard", icon: <HomeIcon />, component: Landing, default: true },
  { id: "games", icon: <ListIcon />, component: Landing }
];

class Layout extends Component {
  componentDidMount = () => {
    const { initNav, history } = this.props;
    initNav(history.location.pathname, navItems);
  };

  render = () => {
    return (
      <div>
        <Header navItems={navItems} />

        <NavigationDrawer navItems={navItems} />

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
      </div>
    );
  };
}

Layout.propTypes = {
  children: PropTypes.object,
  initNav: PropTypes.func,
  history: PropTypes.object
};

Layout = connect(null, { initNav })(Layout);

Layout = withRouter(Layout);

export default Layout;
