import { csrfFetch } from "./csrf";

const LOAD_USER = "user/load";

const loadUser = (payload) => {
  return {
    type: LOAD_USER,
    payload,
  };
};

export const fetchUser = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${id}`);
  const user = await res.json();

  dispatch(loadUser(user));
};

const userReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case LOAD_USER:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default userReducer;
