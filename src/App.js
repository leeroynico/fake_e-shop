import React from "react";
import Nav from "./Components/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ArticleDetails from "./pages/ArticleDetails";
import Boutique from "./Components/Boutique";
import Panier from "./Components/Panier";
import Page404 from "./pages/Page404";

function App() {
  // COOKIES
  // let now = new Date();
  // let time = now.getTime();
  // let expireTime = time + 1000 * 36000;
  // now.setTime(expireTime);
  // //document.cookie = "cookie=test;expires=" + now.toUTCString() + ";";
  // document.cookie = "cookie=test;expires=" + 0 + ";";

  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/article/:id" component={ArticleDetails} />
        <Route path="/" exact component={Boutique} />
        <Route path="/panier" exact component={Panier} />
        <Route component={Page404} />
      </Switch>
    </Router>
  );
}

export default App;
