import * as ReadableAPI from "../ReadableAPI";
import {
  FETCH_COMMENTS,
  FETCH_COMMENT,
  CREATE_COMMENT,
  SAVE_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT,
  UPDATE_COMMENT
} from "./types";

export const fetchComments = postId => async dispatch => {
  try {
    let comments = await ReadableAPI.fetchComments(postId);
    dispatch({ type: FETCH_COMMENTS, postId, comments });
  } catch (e) {
    console.error(e);
  }
};

export const commentCreate = comment => async dispatch => {
  try {
    let result = await ReadableAPI.createComment(comment);
    dispatch({ type: CREATE_COMMENT, comment: result });
  } catch (e) {
    console.error(e);
  }
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

export const commentDelete = comment => async dispatch => {
  try {
    await ReadableAPI.deleteComment(comment.id);
    dispatch({
      type: DELETE_COMMENT,
      postId: comment.parentId,
      commentId: comment.id
    });
  } catch (e) {
    console.error(e);
  }
};

export const commentVote = (id, option) => async dispatch => {
  try {
    let result = await ReadableAPI.voteComment(id, option);
    dispatch({ type: VOTE_COMMENT, comment: result });
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
