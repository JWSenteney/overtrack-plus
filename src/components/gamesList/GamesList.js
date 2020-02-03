import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchGames } from "../../store/games";

class GamesList extends Component {
  render = () => {
    return <div></div>;
  };

  componentDidMount = () => {
    this.props.fetchGames();
  };
}

GamesList.propTypes = {
  fetchGames: PropTypes.func
};

GamesList = connect(null, { fetchGames })(GamesList);

export default GamesList;
