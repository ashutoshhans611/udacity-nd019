import {
  UPDATE_POST,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST
} from "../actions/types";

const INITIAL_STATE = {
  title: "",
  body: "",
  author: "",
  category: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_POST:
      return { ...state, [action.payload.prop]: action.payload.value };
    case CREATE_POST:
    case EDIT_POST:
    case DELETE_POST:
      return INITIAL_STATE;
    default:
      return state;
  }
};
