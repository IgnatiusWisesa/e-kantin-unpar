import { combineReducers } from "redux";
import BottomNavReducer from "./bottomNavReducer";
import CatalogReducer from "./catalogReducer";
import MenuListReducer from "./menuListReducer";

export default combineReducers({
  BottomNav: BottomNavReducer,
  Catalog: CatalogReducer,
  MenuList: MenuListReducer,
});
