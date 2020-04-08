import { LOGIN_SUCCESS } from "../types";

const INITIAL_STATE = {
  id: "",
  adminMail: "",
  adminPassword: "",
  login: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, ...action.payload, login: true };
    default:
      return state;
  }
};
