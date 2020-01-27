import axios from "axios";

// ACTION TYPES
export const TEST_API = "TEST_API";

// ACTIONS
export const testApi = () => async dispatch => {
  const res = await axios.get("/api/test");

  dispatch({ type: TEST_API, payload: res.data });
};

// REDUCER
export default (state = false, action) => {
  switch (action.type) {
    case TEST_API:
      return action.payload || false;
    default:
      return state;
  }
};
