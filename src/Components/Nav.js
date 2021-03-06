import React from "react";
import { Box, Button, Badge } from "@material-ui/core";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";

const TitleStyled = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap");
  font-family: "Abril Fatface", cursive;
  color: #fff;
`;

const Background = styled.div`
  background: rgb(138, 28, 124);
  background: linear-gradient(
    90deg,
    rgba(138, 28, 124, 1) 0%,
    rgba(218, 65, 103, 1) 35%,
    rgba(240, 188, 212, 1) 100%
  );
`;
const LinkStyled = styled(Link)`
  text-decoration: none;
`;

const ButtonMui = styled.button`
  @import url("https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@700&display=swap");
  font-family: "Cabin Sketch", cursive;
`;

function Nav() {
  // useSelector => importer le state du reducer
  const cart = useSelector((state) => state.cart);
  const cartQty = cart.articles.reduce((acc, curr) => acc + curr.qty, 0);

  return (
    <Background>
      <Box display="flex" justifyContent="space-around" alignItems="center">
        <LinkStyled to="/">
          <TitleStyled>Mon Fake Shop</TitleStyled>
        </LinkStyled>
        <Box display="flex" justifyContent="space-around" alignItems="center">
          <Button component={Link} to="/panier">
            <Badge badgeContent={cartQty} color="secondary">
              <ShoppingCartIcon fontSize="large" style={{ color: "white" }} />
            </Badge>
          </Button>
        </Box>
      </Box>
    </Background>
  );
}

export default Nav;
