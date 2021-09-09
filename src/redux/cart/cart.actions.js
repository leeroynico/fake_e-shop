import { CartActionTypes } from "./cart.types";

export const addArticle = (item) => {
  return {
    type: CartActionTypes.ADD_ITEM, //trigger le switch du reducer
    payload: item, // renvoyer les datas dans le reducer
  };
};
