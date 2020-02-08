import React from "react";
import PropTypes from "prop-types";
import { withStyles, withTheme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const HeroIcon = ({ classes, hero, theme }) => {
  return (
    <div>
      <Paper
        className={classes.background}
        style={{ backgroundColor: theme.hero[hero] }}
      />

      <img
        src={require(`../assets/icons/heroes/${hero}.svg`)}
        alt={hero}
        className={classes.icon}
      />
    </div>
  );
};

HeroIcon.propTypes = {
  classes: PropTypes.object,
  hero: PropTypes.string.isRequired,
  theme: PropTypes.object
};

export default withTheme(
  withStyles(
    theme => ({
      background: {
        borderColor: theme.palette.text.disabled,
        borderStyle: "double",
        borderWidth: "2px",
        height: "50px",
        transform: "skewX(-20deg)",
        width: "50px",
        zIndex: 0
      },
      icon: {
        bottom: "52px",
        filter: "invert(100%)",
        height: "55px",
        position: "relative",
        right: "3px",
        zIndex: 1
      }
    }),
    { name: "HeroIcon" }
  )(HeroIcon)
);
