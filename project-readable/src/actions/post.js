import * as ReadableAPI from "../ReadableAPI";
import {
  FETCH_POST,
  UPDATE_POST,
  CREATE_POST,
  SAVE_POST,
  DELETE_POST
} from "./types";

export const postCreate = post => async dispatch => {
  try {
    let result = await ReadableAPI.createPost(post);
    dispatch({ type: CREATE_POST, payload: result });
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

export const postFetch = id => {
  return {
    type: FETCH_POST,
    payload: { id }
  };
};

export const postSave = post => {
  return {
    type: SAVE_POST,
    payload: post
  };
};

export const postDelete = id => {
  return {
    type: DELETE_POST,
    payload: { id }
  };
};
