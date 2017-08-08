import * as ReadableAPI from "../ReadableAPI";
import {
  FETCH_POST,
  UPDATE_POST,
  CREATE_POST,
  SAVE_POST,
  DELETE_POST,
  VOTE_POST
} from "./types";

export const postFetch = id => async dispatch => {
  try {
    let post = await ReadableAPI.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: post });
  } catch (e) {
    console.error(e);
  }
};

export const postCreate = post => async dispatch => {
  try {
    let result = await ReadableAPI.createPost(post);
    dispatch({ type: CREATE_POST, payload: result });
  } catch (e) {
    console.error(e);
  }
};

export const postDelete = id => async dispatch => {
  try {
    let result = await ReadableAPI.deletePost(id);
    dispatch({ type: DELETE_POST, payload: result });
  } catch (e) {
    console.error(e);
  }
};

export const postUpdate = ({ prop, value }) => {
  return {
    type: UPDATE_POST,
    payload: { prop, value }
  };
};

export const postSave = post => {
  return {
    type: SAVE_POST,
    payload: post
  };
};

export const postVote = (id, option) => async dispatch => {
  try {
    let result = await ReadableAPI.votePost(id, option);
    dispatch({ type: VOTE_POST, payload: result });
  } catch (e) {
    console.error(e);
  }
};
