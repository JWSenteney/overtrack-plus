import { FETCH_SHARE_KEYS, FETCH_USER } from "../actions/types";

export default (state = { user: {}, shareKeys: {} }, action) => {
  const { user, shareKeys } = state;
  switch (action.type) {
    case FETCH_USER:
      return { user: action.payload || {}, shareKeys };
    case FETCH_SHARE_KEYS:
      return { user, shareKeys: action.payload.keys || {} };
    default:
      return state;
  }
};
