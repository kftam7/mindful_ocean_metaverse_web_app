import { FETCH_ARTWORKID, UPDATE_ARTWORKID } from "../actions/types";

//if you want multiple reducer you can add another reducer here and exported to combineReducer
const initialState = null;
const artworkIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTWORKID:
      return action.payload || state;
    case UPDATE_ARTWORKID:
      return action.payload;
    default:
      return state;
  }
};

export default artworkIdReducer;
