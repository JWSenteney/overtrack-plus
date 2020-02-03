import axios from "axios";

import { GAMES } from "./endpoints";
import { getGamesPage, processGames } from "../services/gamesListService";

// ACTION TYPES
export const FETCH_GAMES = "FETCH_GAMES";
export const FETCH_SEASONS = "FETCH_SEASONS";

// ACTIONS
export const fetchGames = () => async dispatch => {
  const res = await axios.get(GAMES, { withCredentials: true });

  if (res.data) {
    dispatch({ type: FETCH_SEASONS, payload: res.data.seasons });
    dispatch({ type: FETCH_GAMES, payload: res.data.games });
  }
};

// REDUCER
export default (
  state = {
    filterAccount: "all",
    filterRole: "all",
    games: [],
    gamesPerPage: 25,
    gameTable: [],
    gameTablePage: 0,
    lastGameKey: null,
    seasons: []
  },
  action
) => {
  const nextState = { ...state };
  const { payload, type } = action;

  switch (type) {
    case FETCH_GAMES:
      nextState.games = payload;
      if (payload[0] && payload[0].key !== state.lastGameKey) {
        nextState.games = processGames(payload);
        nextState.lastGameKey = payload[0].key;
      }
      if (state.gameTable.length === 0) {
        nextState.gameTable = getGamesPage(
          nextState.games,
          state.filterAccount,
          state.filterRole,
          state.gameTablePage,
          state.gamesPerPage
        );
      }
      break;
    case FETCH_SEASONS:
      nextState.seasons = payload;
      break;
    default:
      return state;
  }

  return nextState;
};
