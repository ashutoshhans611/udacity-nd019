import { UPDATE_COMMENT_ORDER_KEY, UPDATE_POST_ORDER_KEY } from "./types";

export const changePostOrder = orderKey => {
  return {
    type: UPDATE_POST_ORDER_KEY,
    payload: orderKey
  };
};

export const changeCommentOrder = orderKey => {
  return {
    type: UPDATE_COMMENT_ORDER_KEY,
    payload: orderKey
  };
};
