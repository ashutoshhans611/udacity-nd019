import _ from "lodash";
import {
  FETCH_COMMENTS,
  CREATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT
} from "../actions/types";

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return { ...state, [action.post_id]: action.comments };
    case CREATE_COMMENT:
    case EDIT_COMMENT:
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
        [action.post_id]: _.filter(
          state[action.post_id],
          c => c.id !== action.commentId
        )
      };
    default:
      return state;
  }
}
