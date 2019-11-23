import { TEST_API } from "../actions/types";

export default (state = false, action) => {
  switch (action.type) {
    case TEST_API:
      return action.payload || false;
    default:
      return state;
  }
};
