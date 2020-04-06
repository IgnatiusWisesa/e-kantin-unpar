import { combineReducers } from "redux";
import BottomNavReducer from "./BottomNavReducer";
import Authreducers from './Authreducers';
import CatalogReducer from "./catalogReducer";
import MenuListReducer from "./menuListReducer";


export default combineReducers({
  BottomNav: BottomNavReducer,
  Auth: Authreducers,
  Catalog: CatalogReducer,
  MenuList: MenuListReducer,
});
