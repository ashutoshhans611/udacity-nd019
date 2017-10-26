import { GET_DECKS, GET_DECK, SAVE_DECK_TITLE, ADD_CARD } from "../actions";

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_DECKS:
    case GET_DECK:
    case SAVE_DECK_TITLE:
    case ADD_CARD:
      return action.payload;
    default:
      return state;
  }
}
