import { CartActionTypes } from "./cart.types";
//reducer => fait qqchose

//mon panier est un tableau d'articles
const initialState = {
  articles: [],
};

//ajouter un article au panier et modifier la quantité si l'article existe déjà
const addToCart = (article, articles) => {
  const doublon = articles.find((item) => item.id === article.id);
  if (!doublon) {
    return [...articles, { ...article, qty: 1 }];
  } else {
    return articles.map((x) =>
      article.id === x.id ? { ...doublon, qty: doublon.qty + 1 } : x
    );
  }
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        articles: addToCart(action.payload, state.articles),
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        articles: state.articles.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case CartActionTypes.UPDATE_ITEM:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default cartReducer;
