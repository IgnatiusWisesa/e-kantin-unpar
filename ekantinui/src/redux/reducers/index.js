import { combineReducers } from "redux";
import BottomNavReducer from "./bottomNavReducer";
import CatalogReducer from "./catalogReducer";
import MenuListReducer from "./menuListReducer";
import SearchReducer from "./searchReducer";
import AuthReducer from "./authReducer";

export default combineReducers({
  BottomNav: BottomNavReducer,
  Catalog: CatalogReducer,
  MenuList: MenuListReducer,
  Search: SearchReducer,
  Auth: AuthReducer,
});
