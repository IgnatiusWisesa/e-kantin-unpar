import Axios from "axios";
import { APIURL } from "../../helpers/APIURL";
import { SET_CATALOG_SUCCESS } from "../types";

export const GetListStand = () => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.post(`${APIURL}/public/stand`);
      dispatch({ type: SET_CATALOG_SUCCESS, payload: data.standResult });
    } catch (error) {
      console.log(error);
    }
  };
};
