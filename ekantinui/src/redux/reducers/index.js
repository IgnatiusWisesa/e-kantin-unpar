import { combineReducers } from "redux";
<<<<<<< HEAD
import BottomNavReducer from "./BottomNavReducer";
import Authreducers from './Authreducers'

export default combineReducers({
  BottomNav: BottomNavReducer,
  Auth: Authreducers
=======
import BottomNavReducer from "./bottomNavReducer";
import CatalogReducer from "./catalogReducer";
import MenuListReducer from "./menuListReducer";

export default combineReducers({
  BottomNav: BottomNavReducer,
  Catalog: CatalogReducer,
  MenuList: MenuListReducer,
>>>>>>> 2cb34e6661ad2d278c508805b52dc8be1e251ec3
});
