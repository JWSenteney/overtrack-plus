import { combineReducers } from "redux";

import testReducer from "./testReducer";
import accountReducer from "./accountReducer";
import stateReducer from "./stateReducer";

export default combineReducers({
  test: testReducer,
  account: accountReducer,
  state: stateReducer
});
