import _ from "lodash";
import {
  FETCH_COMMENTS,
  CREATE_COMMENT,
  SAVE_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT
} from "../actions/types";

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return { ...state, [action.postId]: action.comments };
    case CREATE_COMMENT:
    case SAVE_COMMENT:
    case VOTE_COMMENT:
      let comments = _.filter(
        state[action.comment.parentId],
        c => c.id !== action.comment.id
      );
      comments.push(action.comment);

      return { ...state, [action.comment.parentId]: comments };
    case DELETE_COMMENT:
      return {
        ...state,
        [action.postId]: _.filter(
          state[action.postId],
          c => c.id !== action.commentId
        )
      };
    default:
      return state;
  }
}
