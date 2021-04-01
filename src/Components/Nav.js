import React, { useContext, useState, useEffect } from "react";
import { Box, Button, Badge } from "@material-ui/core";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { PanierContext } from "./PanierContext";

function Nav() {
  const [panier] = useContext(PanierContext);
  //récupération du nombre d'article
  function incrementqty() {
    let qty = 0;
    for (let i = 0; i < panier.length; i++) {
      qty += panier[i].qty;
    }
    return qty;
  }

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      style={{ background: "gray" }}
    >
      <h1>Mon Fake shop </h1>
      <Box display="flex" justifyContent="space-around" alignItems="center">
        <Button component={Link} to="/">
          home
        </Button>
        <Button component={Link} to="/panier">
          <Badge badgeContent={incrementqty()} color="secondary">
            <ShoppingCartIcon fontSize="large" />
          </Badge>
        </Button>
      </Box>
    </Box>
  );
}

export default Nav;
