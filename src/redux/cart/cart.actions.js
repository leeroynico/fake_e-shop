import { CartActionTypes } from "./cart.types";

//Action => on dit qu'on va faire une action

export const addArticle = (item) => {
  return {
    type: CartActionTypes.ADD_ITEM, //trigger le switch du reducer
    payload: item, // renvoyer les datas dans le reducer
  };
};
export const removeArticle = (item) => {
  return {
    type: CartActionTypes.REMOVE_ITEM,
    payload: item,
  };
};
export const updateCartQty = (id, qty) => {
  return {
    type: CartActionTypes.UPDATE_CART,
    payload: { id, qty },
    //  qty: qty,
  };
};
