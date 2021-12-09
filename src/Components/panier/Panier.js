import React, { useContext, useState } from "react";
import {
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Paper,
  Button,
  Typography,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import "./panierStyle.css";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { connect } from "react-redux";
import { updateCartQty, removeArticle } from "../../redux/cart/cart.actions";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

const TVA = 20;

const StyledTypo = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap");
  font-family: "Abril Fatface", cursive;
`;

function Panier(props) {
  const { cart, removeItem, updateCart } = props;

  //formatage number
  function format(int) {
    return parseFloat(int).toFixed(2) + " €";
  }

  //faire le sous total
  function sousTotal() {
    let sousTotal = 0;
    for (let index = 0; index < cart.articles.length; index++) {
      sousTotal += cart.articles[index].price * cart.articles[index].qty;
    }
    return sousTotal;
  }

  //faire le total
  const tax = () => {
    return (sousTotal() * TVA) / 100;
  };
  let total = sousTotal() + tax();

  //modifier la quantité
  const updateCartOnClick = (id) => {
    const newQty = prompt("Entrez la nouvelle quantité");
    if (parseFloat(newQty) > 0) {
      updateCart(id, parseFloat(newQty));
    } else if (parseFloat(newQty) === 0) {
      alert("La quantité doit être supérieur à 0");
    } else {
      alert("La quantité doit être un nombre");
    }
  };

  //gestion de la modale
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="dialog" open={open}>
        <DialogTitle id="dialog">
          Voilà où la démonstration s'arrête ! Merci beaucoup !
        </DialogTitle>
      </Dialog>
      {cart.articles.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
            <StyledTypo> Mon panier </StyledTypo>
          </Typography>
          <TableContainer component={Paper} className="tableContainer">
            <Table size="small">
              <TableHead>
                <TableRow
                  style={{
                    backgroundColor: "rgba(240, 188, 212,0.35)",
                  }}
                >
                  <TableCell align="center" colSpan={3} className="underline">
                    nom de l'article
                  </TableCell>
                  <TableCell align="center" colSpan={2} className="underline">
                    quantité
                  </TableCell>
                  <TableCell align="center" colSpan={3} className="underline">
                    prix unitaire
                  </TableCell>
                  <TableCell align="center" colSpan={3} className="underline">
                    total
                  </TableCell>
                  <TableCell align="center" colSpan={1}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.articles.map((article, index) => (
                  <TableRow key={index}>
                    <TableCell align="center" colSpan={3}>
                      <Link
                        to={`/article/${article.id}`}
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        {article.title}
                      </Link>
                    </TableCell>

                    <TableCell align="center" colSpan={2}>
                      {article.qty}
                      <EditIcon
                        fontSize="small"
                        className="edit"
                        onClick={() => {
                          updateCartOnClick(article.id);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" colSpan={3}>
                      {format(article.price)}
                    </TableCell>
                    <TableCell align="center" colSpan={3}>
                      {format(article.price * article.qty)}
                    </TableCell>
                    <TableCell align="center" colSpan={1}>
                      <DeleteForeverIcon
                        fontSize="small"
                        onClick={() => {
                          removeItem(article);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="total">
                  <TableCell colSpan={5}></TableCell>
                  <TableCell colSpan={3} align="right">
                    sous total
                  </TableCell>
                  <TableCell colSpan={4} align="right">
                    {format(sousTotal())}
                  </TableCell>
                </TableRow>
                <TableRow className="total">
                  <TableCell colSpan={5}></TableCell>
                  <TableCell colSpan={3} align="right">
                    TVA (20%)
                  </TableCell>
                  <TableCell colSpan={4} align="right">
                    {format(tax())}
                  </TableCell>
                </TableRow>
                <TableRow className="total">
                  <TableCell colSpan={5}></TableCell>
                  <TableCell
                    colSpan={3}
                    align="right"
                    size="medium"
                    style={{ fontSize: "1.5rem" }}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    colSpan={4}
                    align="right"
                    style={{ fontSize: "1.5rem" }}
                  >
                    {format(total)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginRight: "2%",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            >
              <Button
                size="large"
                color="primary"
                variant="contained"
                onClick={handleClickOpen}
              >
                COMMANDER
              </Button>
            </div>
          </TableContainer>
        </div>
      ) : (
        <Typography align="center" variant="h4" style={{ marginTop: "20px" }}>
          <StyledTypo>
            Votre panier est vide, retournez sur la <Link to="/">boutique</Link>
          </StyledTypo>
        </Typography>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
  removeItem: (item) => dispatch(removeArticle(item)),
  updateCart: (id, qty) => dispatch(updateCartQty(id, qty)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Panier);
