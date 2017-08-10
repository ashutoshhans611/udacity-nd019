import {
  UPDATE_COMMENT_EDIT_FORM,
  RESET_COMMENT_EDIT_FORM
} from "../actions/types";

const INITIAL_STATE = {
  body: "",
  author: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_COMMENT_EDIT_FORM:
      return { ...state, [action.payload.prop]: action.payload.value };
    case RESET_COMMENT_EDIT_FORM:
      return INITIAL_STATE;
    default:
      return state;
  }
};
