import React from "react";
import { Box, Button, Badge } from "@material-ui/core";
import { Link } from "react-router-dom";
//import { useState } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function Nav() {
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
          <Badge badgeContent={2} color="secondary">
            <ShoppingCartIcon fontSize="large" />
          </Badge>
        </Button>
      </Box>
    </Box>
  );
}

export default Nav;
