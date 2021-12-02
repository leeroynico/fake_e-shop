import { CartActionTypes } from "./cart.types";
//reducer => fait qqchose

//mon panier est un tableau d'articles
const initialState = {
  articles: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // const { qty, description } = action.payload;
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        articles: [...state.articles, action.payload],
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        articles: state.articles.filter(
          (item) => item.title !== action.payload.title
        ),
      };

    default:
      return state;
  }
};

export default cartReducer;
