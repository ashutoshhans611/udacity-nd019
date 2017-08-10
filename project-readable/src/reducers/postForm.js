import { UPDATE_POST } from "../actions/types";

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
    default:
      return state;
  }
};
