import { NAVIGATE } from "../actions/types";

export default (state = { selectedNav: 0 }, action) => {
  switch (action.type) {
    case NAVIGATE:
      return { selectedNav: action.payload };
    default:
      return state;
  }
};
