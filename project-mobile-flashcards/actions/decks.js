import { AsyncStorage } from "react-native";

import { GET_DECKS, GET_DECK, SAVE_DECK_TITLE, ADD_CARD } from "./types";

export const getDecks = () => async dispatch => {
  try {
    let decks = await AsyncStorage.getItem("decks");
    if (decks !== null) {
      decks = JSON.parse(decks);
    } else {
      decks = {};
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
    dispatch({
      type: SAVE_DECK_TITLE,
      payload: AsyncStorage.setItem("decks", JSON.stringify(decks))
    });
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
    decks[key].questions.push(question);
    await AsyncStorage.setItem("decks", JSON.stringify(decks));
    dispatch({ type: ADD_CARD, payload: decks });
  } catch (error) {
    console.log("caught error" + error);
  }
};
