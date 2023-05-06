import { FETCH_CONTRACT_NFT } from "../actions/types";

const initialState = "";
const contractNFTReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTRACT_NFT:
      return action.payload || state;
    default:
      return state;
  }
};

export default contractNFTReducer;