import { SEARCH_START, SEARCH_RESET } from "../types";

const INITIAL_STATE = {
  onSearch: false,
  querySearch: "",
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SEARCH_START:
      return { ...state, querySearch: payload, onSearch: true };
    case SEARCH_RESET:
      return INITIAL_STATE;

    default:
      return state;
  }
};
