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
//modifier les quantités d'un article à partir du panier
const updateQty = (articles, id, qty) => {
  return articles.map((x) => (x.id === id ? { ...x, qty: qty } : x));
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
    case CartActionTypes.UPDATE_CART:
      return {
        ...state,
        articles: updateQty(
          state.articles,
          action.payload.id,
          action.payload.qty
        ),
      };

    default:
      return state;
  }
};

export default cartReducer;
