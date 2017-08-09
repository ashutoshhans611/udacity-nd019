import { FETCH_POST, VOTE_POST } from "../actions/types";

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_POST:
    case VOTE_POST:
      return action.payload;
    default:
      return state;
  }
}
