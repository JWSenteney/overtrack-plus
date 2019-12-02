import { combineReducers } from "redux";

import testReducer from "./testReducer";
import accountReducer from "./accountReducer";

export default combineReducers({ test: testReducer, account: accountReducer });
