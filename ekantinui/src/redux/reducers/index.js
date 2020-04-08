import { combineReducers } from "redux";
import BottomNavReducer from "./BottomNavReducer";
import Authreducers from "./Authreducers";
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
