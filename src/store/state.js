import _ from "lodash";

//ACTION TYPES
export const NAVIGATE = "NAVIGATE";
export const SET_DRAWER_OPEN = "SET_DRAWER_OPEN";

// ACTIONS
export const initNav = (pathname, navItems) => dispatch => {
  const tabName = _.chain(pathname)
    .split("/")
    .compact()
    .first()
    .value();

  const tabIndex = _.chain(navItems)
    .findIndex(({ id }) => id === tabName)
    .clamp(0, navItems.length - 1)
    .valueOf();

  dispatch({ type: NAVIGATE, payload: tabIndex });
};

export const navigate = selectedNav => dispatch => {
  dispatch({ type: NAVIGATE, payload: selectedNav });
};

export const setDrawerOpen = isOpen => dispatch => {
  dispatch({ type: SET_DRAWER_OPEN, payload: isOpen });
};

// REDUCER
export default (state = { drawerOpen: false, selectedNav: 0 }, action) => {
  const nextState = { ...state };
  const { payload, type } = action;

  switch (type) {
    case NAVIGATE:
      nextState.selectedNav = payload;
      break;
    case SET_DRAWER_OPEN:
      nextState.drawerOpen = payload;
      break;
    default:
      return state;
  }

  return nextState;
};
