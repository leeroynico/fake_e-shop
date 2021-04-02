import React, { useContext } from "react";
import { PanierContext } from "../PanierContext";
import {
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Paper,
} from "@material-ui/core";
import "./panierStyle.css";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const TVA = 20;

function Panier() {
  const [panier, setPanier] = useContext(PanierContext);

  //formatage number
  function format(int) {
    return parseFloat(int).toFixed(2) + " €";
  }

  //faire le sous total
  function sousTotal() {
    let sousTotal = 0;
    for (let index = 0; index < panier.length; index++) {
      sousTotal += panier[index].price * panier[index].qty;
    }
    return sousTotal;
  }

  //faire le total
  function tax() {
    let sum = sousTotal();
    return (sum * TVA) / 100;
  }
  function total() {
    let sum = sousTotal();
    let TVA = tax();
    return sum + TVA;
  }

  //modifier la quantité
  function modifiyQty(monArticle) {
    let newQty = prompt("quantité");
    setPanier(
      panier.map((x) =>
        x.title === monArticle.title ? { ...monArticle, qty: newQty } : x
      )
    );
  }

  //supprimer article
  function deleteArticle(monArticle) {
    setPanier(panier.filter((x) => x.title !== monArticle.title));
  }

  console.log(panier);
  if (panier.length === 0) {
    return <div>le panier est vide</div>;
  } else {
    return (
      <div>
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
              {panier.map((article) => (
                <TableRow key={article.idpanier}>
                  <TableCell align="center" colSpan={3}>
                    {article.title}
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    {article.qty}{" "}
                    <EditIcon
                      fontSize="small"
                      className="edit"
                      onClick={() => {
                        modifiyQty(article);
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
                        deleteArticle(article);
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
                  {format(total())}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
export default Panier;
