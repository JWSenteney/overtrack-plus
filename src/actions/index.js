import axios from "axios";
import _ from "lodash";

import { TEST_API, FETCH_USER, FETCH_SHARE_KEYS, NAVIGATE } from "./types";

const otApis = {
  v1: "https://api.overtrack.gg"
};

export const testApi = () => async dispatch => {
  const res = await axios.get("/api/test");

  dispatch({ type: TEST_API, payload: res.data });
};

export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get(`${otApis.v1}/user`, {
      withCredentials: true
    });
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (error) {
    dispatch({ type: FETCH_USER, payload: {} });
  }
};

export const logout = () => async () => {
  const res = await axios.get(`${otApis.v1}/logout`, {
    withCredentials: true
  });

  const { token } = res.data;
  if (token) {
    document.location.href = `${otApis.v1}/logout?token=${token}&next=${document.location.href}`;
  }
};

export const fetchShareKeys = () => async dispatch => {
  const res = await axios.get(`${otApis.v1}/share_keys`, {
    withCredentials: true
  });

  dispatch({ type: FETCH_SHARE_KEYS, payload: res.data });
};

export const navigate = selectedNav => dispatch => {
  dispatch({ type: NAVIGATE, payload: selectedNav });
};

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
