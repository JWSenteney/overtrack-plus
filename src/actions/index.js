import axios from "axios";

import { TEST_API } from "./types";

export const testApi = () => async dispatch => {
  const res = await axios.get("/api/test");

  dispatch({ type: TEST_API, payload: res.data });
};
