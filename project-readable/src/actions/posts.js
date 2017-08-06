import * as ReadableAPI from "../ReadableAPI";
import { FETCH_POSTS } from "./types";

export const fetchAllPosts = () => async dispatch => {
  try {
    let posts = await ReadableAPI.fetchAllPosts();
    dispatch({ type: FETCH_POSTS, payload: { posts } });
  } catch (e) {
    console.error(e);
  }
};
