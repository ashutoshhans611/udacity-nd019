export const GET_DECKS = "get_decks";
export const GET_DECK = "get_deck";
export const SAVE_DECK_TITLE = "save_deck_title";
export const ADD_CARD = "add_card";

import { AsyncStorage } from "react-native";

export const getDecks = () => async dispatch => {
  try {
    let decks = await AsyncStorage.getItem("decks");
    if (decks !== null) {
      decks = JSON.parse(decks);
    }
    dispatch({ type: GET_DECKS, payload: decks });
  } catch (error) {
    console.log("caught error" + error);
  }
};

export const getDeck = key => async dispatch => {
  try {
    let decks = await AsyncStorage.getItem("decks");
    if (decks !== null) {
      decks = JSON.parse(decks);
    }
    dispatch({ type: GET_DECK, payload: decks[key] });
  } catch (error) {
    console.log("caught error" + error);
  }
};

export const saveDeckTitle = title => async dispatch => {
  try {
    let decks = await AsyncStorage.getItem("decks");
    if (decks !== null) {
      decks = JSON.parse(decks);
    } else {
      decks = {};
    }
    decks[title] = { title, questions: [] };
    await AsyncStorage.setItem("decks", JSON.stringify(decks));
    dispatch({ type: SAVE_DECK_TITLE, payload: decks });
  } catch (error) {
    console.log("caught error" + error);
  }
};

export const addCardToDeck = (key, question) => async dispatch => {
  try {
    let decks = await AsyncStorage.getItem("decks");
    if (decks !== null) {
      decks = JSON.parse(decks);
    }
    decks[key] = decks[key].questions.add(question);
    await AsyncStorage.setItem("decks", JSON.stringify(decks));
    dispatch({ type: ADD_CARD, payload: decks });
  } catch (error) {
    console.log("caught error" + error);
  }
};
