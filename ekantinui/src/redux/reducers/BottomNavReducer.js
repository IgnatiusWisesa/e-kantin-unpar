import { SET_VALUE_BOTTOMNAV } from "../types";

const INITIAL_STATE = {
  value: 0
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_VALUE_BOTTOMNAV:
      return { ...state, value: payload };
    default:
      return state;
  }
};
