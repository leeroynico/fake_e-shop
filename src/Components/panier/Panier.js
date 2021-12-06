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
} from "@material-ui/core";
import "./panierStyle.css";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { connect } from "react-redux";
import { updateCartQty, removeArticle } from "../../redux/cart/cart.actions";

const TVA = 20;

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

  return (
    <div>
      {cart.articles.length > 0 ? (
        <TableContainer component={Paper} className="tableContainer">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  nom de l'article
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  quantité
                </TableCell>
                <TableCell align="center" colSpan={3}>
                  prix unitaire
                </TableCell>
                <TableCell align="center" colSpan={3}>
                  total
                </TableCell>
                <TableCell align="center" colSpan={1}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.articles.map((article, index) => (
                <TableRow key={index}>
                  <TableCell align="center" colSpan={3}>
                    {article.title}
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    {article.qty}{" "}
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
                <TableCell colSpan={4}></TableCell>
                <TableCell colSpan={3} align="right">
                  sous total
                </TableCell>
                <TableCell colSpan={4} align="left">
                  {format(sousTotal())}
                </TableCell>
              </TableRow>
              <TableRow className="total">
                <TableCell colSpan={4}></TableCell>
                <TableCell colSpan={3} align="right">
                  TVA (20%)
                </TableCell>
                x
                <TableCell colSpan={4} align="left">
                  {format(tax())}
                </TableCell>
              </TableRow>
              <TableRow className="total">
                <TableCell colSpan={4}></TableCell>
                <TableCell colSpan={3} align="right">
                  Total
                </TableCell>
                <TableCell colSpan={4} align="left">
                  {format(total)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <span>Votre panier est vide</span>
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
