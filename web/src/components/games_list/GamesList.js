import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchGames } from "../../store/games";
import GameCard from "./GameCard";
import { Grid } from "@material-ui/core";

class GamesList extends Component {
  render = () => {
    const { gameTable } = this.props;

    return (
      <Grid container spacing={2}>
        {gameTable.map(game => (
          <Grid item md={4} sm={6} xs={12} key={game.key}>
            <GameCard game={game} />
          </Grid>
        ))}
      </Grid>
    );
  };

  componentDidMount = () => {
    this.props.fetchGames();
  };
}

GamesList.propTypes = {
  fetchGames: PropTypes.func,
  gameTable: PropTypes.array
};

GamesList = connect(
  ({ games }) => ({
    gameTable: games.gameTable
  }),
  {
    fetchGames
  }
)(GamesList);

export default GamesList;
