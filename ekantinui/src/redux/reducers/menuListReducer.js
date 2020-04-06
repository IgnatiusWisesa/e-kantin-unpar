import { SET_MENULIST_SUCCESS } from "../types";

const INITIAL_STATE = {
  listFood: [],
  listDrink: [],

  loading: true,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_MENULIST_SUCCESS:
      return {
        ...INITIAL_STATE,
        listFood: payload.food,
        listDrink: payload.drink,
        loading: false,
      };

    default:
      return state;
  }
};
