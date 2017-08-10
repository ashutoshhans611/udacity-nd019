import { UPDATE_COMMENT } from "../actions/types";

const INITIAL_STATE = {
  body: "",
  author: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_COMMENT:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
};
