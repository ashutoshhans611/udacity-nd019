import * as ReadableAPI from "../ReadableAPI";
import { FETCH_COMMENTS } from "./types";

export const fetchComments = postId => async dispatch => {
  try {
    let comments = await ReadableAPI.fetchComments(postId);
    dispatch({ type: FETCH_COMMENTS, payload: { comments } });
  } catch (e) {
    console.error(e);
  }
};
