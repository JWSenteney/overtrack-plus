import axios from "axios";

import { TEST_API, FETCH_USER } from "./types";

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
