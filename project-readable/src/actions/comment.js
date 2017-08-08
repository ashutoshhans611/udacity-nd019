import * as ReadableAPI from "../ReadableAPI";
import {
  FETCH_COMMENT,
  UPDATE_COMMENT,
  CREATE_COMMENT,
  SAVE_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT
} from "./types";

export const commentCreate = comment => async dispatch => {
  try {
    let result = await ReadableAPI.createComment(comment);
    dispatch({ type: CREATE_COMMENT, payload: result });
  } catch (e) {
    console.error(e);
  }
};

export const commentUpdate = ({ prop, value }) => {
  return {
    type: UPDATE_COMMENT,
    payload: { prop, value }
  };
};

export const commentFetch = id => {
  return {
    type: FETCH_COMMENT,
    payload: { id }
  };
};

export const commentSave = comment => {
  return {
    type: SAVE_COMMENT,
    payload: comment
  };
};

export const commentDelete = id => async dispatch => {
  try {
    let result = await ReadableAPI.deleteComment(id);
    dispatch({ type: DELETE_COMMENT, payload: result });
  } catch (e) {
    console.error(e);
  }
};

export const commentVote = (id, option) => async dispatch => {
  try {
    let result = await ReadableAPI.voteComment(id, option);
    dispatch({ type: VOTE_COMMENT, payload: result });
  } catch (e) {
    console.error(e);
  }
};
