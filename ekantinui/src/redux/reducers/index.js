import { combineReducers } from "redux";
import BottomNavReducer from "./BottomNavReducer";
import Authreducers from './Authreducers'

export default combineReducers({
  BottomNav: BottomNavReducer,
  Auth: Authreducers
});
