import { combineReducers } from "redux";
import cartReducer from "./cart/cart.reducer";
import articleReducer from "./article/article.reducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  article: articleReducer,
});

export default rootReducer;
