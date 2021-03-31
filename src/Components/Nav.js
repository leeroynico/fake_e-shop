import React, { useEffect } from "react";
import { Box, Button, Badge } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import axios from "axios";

let urlPanier = "http://localhost:8000/products";
function Nav() {
  const [panier, setPanier] = useState([]);
  //récupération des datas du panier
  function getPanier() {
    axios.get(urlPanier).then(function (response) {
      setPanier(response.data);
    });
  }
  useEffect(() => {
    getPanier();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      style={{ background: "gray" }}
    >
      <h1>Mon Fake shop</h1>
      <Box display="flex" justifyContent="space-around" alignItems="center">
        <Button component={Link} to="/">
          home
        </Button>
        <Button component={Link} to="/panier">
          <Badge badgeContent={panier.length} color="secondary">
            <ShoppingCartIcon fontSize="large" />
          </Badge>
        </Button>
      </Box>
    </Box>
  );
}

export default Nav;
