//combine the reducers here
import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import balanceReducer from "./balanceReducer";
import contractReducer from "./contractReducer";
import contractNFTReducer from "./contractNFTReducer";
import userReducer from "./userReducer";

export default combineReducers({
  accountState: accountReducer,
  balanceState: balanceReducer,
  contractState: contractReducer,
  contractNFTState: contractNFTReducer,
  userState: userReducer
});
