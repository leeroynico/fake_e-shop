import React, { useEffect } from "react";
import Nav from "./Components/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DetailsArticle from "./pages/DetailsArticle";
import Boutique from "./Components/boutique/Boutique";
import Panier from "./Components/panier/Panier";
import Page404 from "./pages/Page404";
import { useDispatch } from "react-redux";
import { setArticle } from "./redux/article/article.action";
import { connect } from "react-redux";
import axios from "axios";

const url = "https://fakestoreapi.com/products";

function App(props) {
  const { setArticleToStore } = props;

  async function getProducts() {
    try {
      const response = await axios.get(url);
      setArticleToStore(response.data);
    } catch (error) {
      console.error("message erreur axios boutique : " + error);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/article/:id" component={DetailsArticle} />
        <Route path="/" exact component={Boutique} />
        <Route path="/panier" exact component={Panier} />
        <Route component={Page404} />
      </Switch>
    </Router>
  );
}
const mapStateToProps = (state) => ({
  articleFromStore: state.article,
});
const mapDispatchToProps = (dispatch) => ({
  setArticleToStore: (article) => dispatch(setArticle(article)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
