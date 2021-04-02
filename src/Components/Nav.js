import React, { useContext, useState, useEffect, useCallback } from "react";
import { Box, Button, Badge } from "@material-ui/core";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { PanierContext } from "./PanierContext";

function Nav() {
  const [panier] = useContext(PanierContext);
  const [qty, setQty] = useState(0);

  //récupération du nombre d'article
  // useEffect(
  //   setQty(() => {
  //     if (panier.length === 0) {
  //       return 0;
  //     } else {
  //       panier.reduce((x, y) => x.qty + y.qty);
  //     }
  //   }),
  //   [panier]
  // );
  useEffect(() => {
    if (panier.length === 0) {
      setQty(0);
    } else {
      setQty(panier.map((x) => x.qty).reduce((a, b) => a + b));
    }
  }, [panier]);

  // function incrementqty() {
  //   let qty = 0;
  //   for (let i = 0; i < panier.length; i++) {
  //     qty += panier[i].qty;
  //   }
  //   return qty;
  // }

  //console.log(panier.map((x) => x.qty).reduce((a, b) => a + b));

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
