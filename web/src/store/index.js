import { combineReducers } from "redux";

import accountReducer from "./account";
import gamesReducer from "./games";
import stateReducer from "./state";

export default combineReducers({
  account: accountReducer,
  games: gamesReducer,
  state: stateReducer
});
