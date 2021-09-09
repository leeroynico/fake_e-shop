import React from "react";
import Nav from "./Components/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import ArticleDetails from "./pages/ArticleDetails";
import DetailsArticle from "./pages/DetailsArticle";
import Boutique from "./Components/boutique/Boutique";
import Panier from "./Components/panier/Panier";
import Page404 from "./pages/Page404";
//import { PanierProvider } from "./Components/PanierContext";

function App() {
  // COOKIES
  // let now = new Date();
  // let time = now.getTime();
  // let expireTime = time + 1000 * 36000;
  // now.setTime(expireTime);
  // //document.cookie = "cookie=test;expires=" + now.toUTCString() + ";";
  // document.cookie = "cookie=test;expires=" + 0 + ";";

  return (
    // <PanierProvider>
    <Router>
      <Nav />
      <Switch>
        <Route path="/article/:id" component={DetailsArticle} />
        <Route path="/" exact component={Boutique} />
        <Route path="/panier" exact component={Panier} />
        <Route component={Page404} />
      </Switch>
    </Router>
    //</PanierProvider>
  );
}

export default App;
