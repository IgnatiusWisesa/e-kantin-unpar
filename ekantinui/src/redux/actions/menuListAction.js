import Axios from "axios";
import { APIURL } from "../../helpers/APIURL";
import { SET_MENULIST_SUCCESS } from "../types";

export const GetMenuList = () => {
  return async (dispatch) => {
    try {
      const food = await Axios.post(`${APIURL}/public/menu/food`);
      const drink = await Axios.post(`${APIURL}/public/menu/drink`);
      dispatch({
        type: SET_MENULIST_SUCCESS,
        payload: {
          food: food.data.foodResult,
          drink: drink.data.drinkResult,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
