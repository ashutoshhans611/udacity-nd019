import { combineReducers } from "redux";

import categories from "./categories";
import posts from "./posts";
import postForm from "./postForm";
import comments from "./comments";
import commentForm from "./commentForm";

export default combineReducers({
  categories,
  posts,
  postForm,
  comments,
  commentForm
});
