import { FETCH_COMMENTS } from "../actions/types";

const INITIAL_STATE = {
  comments: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return action.payload;
    default:
      return state;
  }
}
