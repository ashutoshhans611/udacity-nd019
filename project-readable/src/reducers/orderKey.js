import {
  UPDATE_POST_ORDER_KEY,
  UPDATE_COMMENT_ORDER_KEY
} from "../actions/types";

const INITIAL_STATE = {
  post: "voteScore",
  comment: "voteScore"
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_POST_ORDER_KEY:
      return { ...state, post: action.payload };
    case UPDATE_COMMENT_ORDER_KEY:
      return { ...state, comment: action.payload };
    default:
      return state;
  }
}
