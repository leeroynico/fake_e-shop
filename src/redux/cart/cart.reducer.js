import { CartActionTypes } from "./cart.types";

const initialState = {
  articles: [
    { qty: 2, description: "jean en 40" },
    { qty: 1, description: "short en 38" },
  ],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // const { qty, description } = action.payload;
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        articles: [...state.articles, action.payload],
      };
    default:
      return state;
  }
};

export default cartReducer;
