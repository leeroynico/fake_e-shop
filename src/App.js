import React from "react";
import Nav from "./Components/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DetailsArticle from "./pages/DetailsArticle";
import Boutique from "./Components/boutique/Boutique";
import Panier from "./Components/panier/Panier";
import Page404 from "./pages/Page404";

function App() {
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

export default App;
