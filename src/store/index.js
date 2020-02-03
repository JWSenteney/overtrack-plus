import { combineReducers } from "redux";

import testReducer from "./test";
import accountReducer from "./account";
import gamesReducer from "./games";
import stateReducer from "./state";

export default combineReducers({
  test: testReducer,
  account: accountReducer,
  games: gamesReducer,
  state: stateReducer
});
