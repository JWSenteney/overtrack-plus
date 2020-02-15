import React, { Component } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Chip,
  Grid,
  Paper,
  Typography
} from "@material-ui/core";
import { ArrowRightAlt } from "@material-ui/icons";
import { Translate } from "react-localize-redux";
import { withStyles } from "@material-ui/core/styles";

import HeroIcon from "../HeroIcon";
import { getFriendlyMapName } from "../../services/nameMapService";

class GameCard extends Component {
  render = () => {
    const { classes, game } = this.props;
    const { duration, heroes_played, map, time } = game;

    return (
      <Translate>
        {({ translate }) => (
          <Card
            onMouseEnter={() => this.setState({ mousedOver: true })}
            onMouseLeave={() => this.setState({ mousedOver: false })}
            raised={this.state.mousedOver}
            className={classes.root}
          >
            <CardMedia
              image={require(`../../assets/images/maps/${this.getFriendlyMapName(
                map
              )}.jpg`)}
              className={classes.media}
            >
              <Paper className={classes.mediaWedge} />
              <div className={classes.heroIcon}>
                <HeroIcon hero={heroes_played[0]} />
              </div>
            </CardMedia>
            <div className={classes.mainCard}>
              <CardHeader
                title={this.renderCardTitle()}
                subheader={moment
                  .unix(time)
                  .format(translate("game_card.date_format"))}
                className={classes.header}
                classes={{ content: classes.headerContent }}
              />
              <CardContent className={classes.content}>
                <Typography>
                  {translate("game_card.duration", {
                    duration: moment.duration(duration, "s").minutes()
                  })}
                </Typography>

                {this.renderSRChip()}
              </CardContent>
            </div>
          </Card>
        )}
      </Translate>
    );
  };

  renderCardTitle = () => {
    const { classes, game } = this.props;
    const { result, score } = game;

    return (
      <Translate>
        {({ translate }) => (
          <Typography variant="h5" className={classes.title}>
            <span
              className={
                result === "WIN"
                  ? classes.plusSr
                  : result === "LOSS"
                  ? classes.minusSr
                  : null
              }
            >
              {translate("game_card.title", {
                blue_score: score ? score.blue : "?",
                red_score: score ? score.red : "?",
                result: translate(`game_card.${result}`)
              })}
            </span>
          </Typography>
        )}
      </Translate>
    );
  };

  renderSRChip = () => {
    const { classes, game } = this.props;
    const { game_type } = game;

    if (game_type === "competitive") {
      return (
        <Chip
          label={this.renderSRChangeLabel()}
          variant="outlined"
          className={classes.srChange}
        />
      );
    } else return null;
  };

  renderSRChangeLabel = () => {
    const { classes, game } = this.props;
    const { end_sr, start_sr } = game;
    const change = end_sr && start_sr ? end_sr - start_sr : null;
    const changeClass =
      change !== null && change >= 0 ? classes.plusSr : classes.minusSr;
    const changeString = changeClass === classes.plusSr ? `+${change}` : change;

    return (
      <Grid
        container
        alignItems="center"
        wrap="nowrap"
        className={classes.srChangeLabel}
      >
        <Grid item>
          <Typography variant="body2">{start_sr || "?"}</Typography>
        </Grid>
        <Grid item>
          <ArrowRightAlt />
        </Grid>
        <Grid item>
          <Typography variant="body2">{end_sr || "?"}</Typography>
        </Grid>
        <Grid item className={changeClass}>
          <Typography variant="body2">
            ({changeString !== null ? changeString : "?"})
          </Typography>
        </Grid>
      </Grid>
    );
  };

  state = { mousedOver: false };

  getFriendlyMapName = map => {
    return getFriendlyMapName(map);
  };
}

GameCard.propTypes = {
  classes: PropTypes.object,
  game: PropTypes.object.isRequired
};

GameCard = withStyles(
  theme => ({
    root: {
      display: "flex",
      height: "94px",
      overflow: "hidden",
      "&:hover": {
        cursor: "pointer"
      }
    },
    content: {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
      padding: theme.spacing(1)
    },
    header: {
      padding: theme.spacing(1),
      whiteSpace: "nowrap"
    },
    headerContent: {
      alignItems: "baseline",
      display: "flex"
    },
    heroIcon: {
      bottom: "72px",
      float: "right",
      position: "relative",
      right: "4px"
    },
    mainCard: {
      display: "flex",
      flexDirection: "column",
      flexGrow: "1"
    },
    media: {
      overflow: "hidden",
      width: "135px"
    },
    mediaWedge: {
      border: 0,
      borderRadius: 0,
      height: "100%",
      left: "110px",
      position: "relative",
      transform: "skewX(-20deg)"
    },
    minusSr: {
      color: theme.palette.error.main
    },
    plusSr: {
      color: theme.palette.success[500]
    },
    srChange: {
      bottom: "0px",
      left: "0px",
      position: "relative"
    },
    srChangeLabel: {
      "& div:last-child": {
        paddingLeft: theme.spacing(0.5)
      }
    },
    title: {
      marginRight: theme.spacing(1)
    }
  }),
  { name: "GameCard" }
)(GameCard);

export default GameCard;
