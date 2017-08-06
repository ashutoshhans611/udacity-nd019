import * as ReadableAPI from "../ReadableAPI";
import { FETCH_CATEGORIES } from "./types";

export const fetchCategories = () => async dispatch => {
  try {
    let categories = await ReadableAPI.fetchCategories();
    dispatch({ type: FETCH_CATEGORIES, payload: { categories } });
  } catch (e) {
    console.error(e);
  }
};
