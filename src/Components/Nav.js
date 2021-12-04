import React from "react";
import { Box, Button, Badge } from "@material-ui/core";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useSelector } from "react-redux";

function Nav() {
  // useSelector => importer le state du reducer
  const cart = useSelector((state) => state.cart);
  const cartQty = cart.articles.reduce((acc, curr) => acc + curr.qty, 0);

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
          <Badge badgeContent={cartQty} color="secondary">
            <ShoppingCartIcon fontSize="large" />
          </Badge>
        </Button>
      </Box>
    </Box>
  );
}

export default Nav;
