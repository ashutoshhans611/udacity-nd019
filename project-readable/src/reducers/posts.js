import { FETCH_POSTS, VOTE_POST } from "../actions/types";

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload;
    case VOTE_POST:
      let posts = state.filter(p => p.id !== action.payload.id);
      posts.push(action.payload);
      return posts;
    default:
      return state;
  }
}
