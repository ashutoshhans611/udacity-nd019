import * as ReadableAPI from "../ReadableAPI";
import {
  FETCH_COMMENTS,
  FETCH_COMMENT,
  CREATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT,
  UPDATE_COMMENT_FORM,
  RESET_COMMENT_FORM,
  UPDATE_COMMENT_EDIT_FORM,
  RESET_COMMENT_EDIT_FORM
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

export const commentEdit = comment => async dispatch => {
  try {
    let result = await ReadableAPI.editComment(comment);
    dispatch({ type: EDIT_COMMENT, comment: result });
  } catch (e) {
    console.error(e);
  }
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

export const commentFormUpdate = ({ prop, value }) => {
  return {
    type: UPDATE_COMMENT_FORM,
    payload: { prop, value }
  };
};

export const commentFormReset = () => {
  return {
    type: RESET_COMMENT_FORM
  };
};

export const commentEditFormUpdate = ({ prop, value }) => {
  return {
    type: UPDATE_COMMENT_EDIT_FORM,
    payload: { prop, value }
  };
};

export const commentEditFormReset = () => {
  return {
    type: RESET_COMMENT_EDIT_FORM
  };
};
