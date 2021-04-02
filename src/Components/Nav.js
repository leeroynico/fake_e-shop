import React, { useContext, useState, useEffect } from "react";
import { Box, Button, Badge } from "@material-ui/core";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { PanierContext } from "./PanierContext";

function Nav() {
  const [panier] = useContext(PanierContext);
  const [qty, setQty] = useState(0);

  useEffect(() => {
    if (panier.length === 0) {
      setQty(0);
    } else {
      setQty(panier.map((x) => x.qty).reduce((a, b) => a + b));
    }
  }, [panier]);

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
          <Badge badgeContent={qty} color="secondary">
            <ShoppingCartIcon fontSize="large" />
          </Badge>
        </Button>
      </Box>
    </Box>
  );
}

export default Nav;
