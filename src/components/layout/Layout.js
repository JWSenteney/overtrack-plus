import React from "react";
import PropTypes from "prop-types";
import { Home as HomeIcon, List as ListIcon } from "@material-ui/icons";
import { Route, Switch } from "react-router-dom";

import Header from "./Header";
import Landing from "../Landing";

const navItems = [
  { id: "dashboard", icon: <HomeIcon />, component: Landing, default: true },
  { id: "games", icon: <ListIcon />, component: Landing }
];

const Layout = () => {
  return (
    <div>
      <Header navItems={navItems} />

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

Layout.propTypes = {
  children: PropTypes.object
};

export default Layout;
