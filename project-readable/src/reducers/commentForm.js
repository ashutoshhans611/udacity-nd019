import {
  UPDATE_COMMENT,
  CREATE_COMMENT,
  SAVE_COMMENT,
  DELETE_COMMENT
} from "../actions/types";

const INITIAL_STATE = {
  body: "",
  author: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_COMMENT:
      return { ...state, [action.payload.prop]: action.payload.value };
    case CREATE_COMMENT:
    case SAVE_COMMENT:
    case DELETE_COMMENT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
