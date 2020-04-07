import { combineReducers } from "redux";
import BottomNavReducer from "./bottomNavReducer";
import AuthReducer from "./authReducer";
import CatalogReducer from "./catalogReducer";
import MenuListReducer from "./menuListReducer";
import SearchReducer from "./searchReducer";

export default combineReducers({
  BottomNav: BottomNavReducer,
  Auth: AuthReducer,
  Catalog: CatalogReducer,
  MenuList: MenuListReducer,
  Search: SearchReducer,
});
