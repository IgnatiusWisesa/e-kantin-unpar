import { SET_CATALOG_SUCCESS } from "../types";

const INITIAL_STATE = {
  listStand: [],
  loading: true,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_CATALOG_SUCCESS:
      return { ...INITIAL_STATE, listStand: payload, loading: false };

    default:
      return state;
  }
};