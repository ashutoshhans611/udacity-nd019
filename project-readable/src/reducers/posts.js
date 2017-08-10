import {
  FETCH_POSTS,
  FETCH_POST,
  VOTE_POST,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST
} from "../actions/types";

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload;
    case FETCH_POST:
    case VOTE_POST:
    case CREATE_POST:
    case EDIT_POST:
      let posts = state.filter(p => p.id !== action.payload.id);
      posts.push(action.payload);
      return posts;
    case DELETE_POST:
      return state.filter(p => p.id !== action.payload.id);
    default:
      return state;
  }
}
