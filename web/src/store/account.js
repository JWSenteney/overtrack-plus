import axios from "axios";

import { LOGOUT, SHARE_KEYS, USER } from "./endpoints";

// ACTION TYPES
export const FETCH_SHARE_KEYS = "FETCH_SHARE_KEYS";
export const FETCH_USER = "FETCH_USER";

// ACTIONS
export const fetchShareKeys = () => async dispatch => {
  const res = await axios.get(SHARE_KEYS, {
    withCredentials: true
  });

  dispatch({ type: FETCH_SHARE_KEYS, payload: res.data });
};

export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get(USER, {
      withCredentials: true
    });
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (error) {
    dispatch({ type: FETCH_USER, payload: {} });
  }
};

export const logout = () => async () => {
  const res = await axios.get(LOGOUT, {
    withCredentials: true
  });

  const { token } = res.data;
  if (token) {
    document.location.href = `${LOGOUT}?token=${token}&next=${document.location.href}`;
  }
};

// REDUCER
export default (state = { user: {}, shareKeys: [] }, action) => {
  const nextState = { ...state };
  const { payload, type } = action;

  switch (type) {
    case FETCH_USER:
      nextState.user = payload;
      break;
    case FETCH_SHARE_KEYS:
      nextState.shareKeys = payload;
      break;
    default:
      return state;
  }

  return nextState;
};
