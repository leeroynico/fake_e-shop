import { ArticleActionTypes } from "./article.types";

const articleReducer = (state = [], action) => {
  switch (action.type) {
    case ArticleActionTypes.SET_ARTICLE:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default articleReducer;
