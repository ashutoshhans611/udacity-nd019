import * as ReadableAPI from "../ReadableAPI";
import {
  FETCH_POSTS,
  FETCH_POST,
  UPDATE_POST_FORM,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  VOTE_POST
} from "./types";

export const fetchAllPosts = () => async dispatch => {
  try {
    let posts = await ReadableAPI.fetchAllPosts();
    dispatch({ type: FETCH_POSTS, posts });
  } catch (e) {
    console.error(e);
  }
};

export const fetchPosts = category => async dispatch => {
  try {
    let posts = await ReadableAPI.fetchPosts(category);
    dispatch({ type: FETCH_POSTS, posts });
  } catch (e) {
    console.error(e);
  }
};

export const postFetch = id => async dispatch => {
  try {
    let post = await ReadableAPI.fetchPost(id);
    dispatch({ type: FETCH_POST, post });
  } catch (e) {
    console.error(e);
  }
};

export const postCreate = post => async dispatch => {
  try {
    let result = await ReadableAPI.createPost(post);
    dispatch({ type: CREATE_POST, post: result });
  } catch (e) {
    console.error(e);
  }
};

export const postDelete = id => async dispatch => {
  try {
    let result = await ReadableAPI.deletePost(id);
    dispatch({ type: DELETE_POST, post: result });
  } catch (e) {
    console.error(e);
  }
};

export const postUpdate = ({ prop, value }) => {
  return {
    type: UPDATE_POST_FORM,
    payload: { prop, value }
  };
};

export const postEdit = post => async dispatch => {
  try {
    let result = await ReadableAPI.editPost(post);
    dispatch({ type: EDIT_POST, post: result });
  } catch (e) {
    console.error(e);
  }
};

export const postVote = (id, option) => async dispatch => {
  try {
    let result = await ReadableAPI.votePost(id, option);
    dispatch({ type: VOTE_POST, post: result });
  } catch (e) {
    console.error(e);
  }
};
