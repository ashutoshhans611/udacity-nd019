import { combineReducers } from "redux";

import categories from "./categories";
import posts from "./posts";
import comments from "./comments";
import postForm from "./postForm";

export default combineReducers({
  categories,
  posts,
  comments,
  postForm
});
