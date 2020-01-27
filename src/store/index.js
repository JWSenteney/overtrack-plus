import { combineReducers } from "redux";

import testReducer from "./test";
import accountReducer from "./account";
import stateReducer from "./state";

export default combineReducers({
  test: testReducer,
  account: accountReducer,
  state: stateReducer
});
