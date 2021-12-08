import { ArticleActionTypes } from "./article.types";

export const setArticle = (objet) => {
  return {
    type: ArticleActionTypes.SET_ARTICLE,
    payload: objet,
  };
};
