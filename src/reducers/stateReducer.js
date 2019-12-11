import { NAVIGATE, SET_DRAWER_OPEN } from "../actions/types";

export default (state = { drawerOpen: false, selectedNav: 0 }, action) => {
  const { payload, type } = action;
  const { drawerOpen, selectedNav } = state;

  switch (type) {
    case NAVIGATE:
      return { drawerOpen, selectedNav: payload };
    case SET_DRAWER_OPEN:
      return { drawerOpen: payload, selectedNav };
    default:
      return state;
  }
};
