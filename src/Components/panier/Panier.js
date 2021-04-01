import React, { useContext, useState } from "react";
import { PanierContext } from "../PanierContext";
import {
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Paper,
  TextField,
} from "@material-ui/core";
import "./panierStyle.css";
const TVA = 20;

function Panier() {
  const [panier] = useContext(PanierContext);

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
  console.log(panier);
  if (panier.length == 0) {
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
              </TableRow>
            </TableHead>
            <TableBody>
              {panier.map((article) => (
                <TableRow key={article.idpanier}>
                  <TableCell align="center" colSpan={3}>
                    {article.title}
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    <TextField label="Qté" type="number">
                      {article.qty}
                    </TextField>
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    {format(article.price)}
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    {format(article.price * article.qty)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="total">
                <TableCell colSpan={4}></TableCell>
                <TableCell colSpan={3} align="right">
                  sous total
                </TableCell>
                <TableCell colSpan={3} align="left">
                  {format(sousTotal())}
                </TableCell>
              </TableRow>
              <TableRow className="total">
                <TableCell colSpan={4}></TableCell>
                <TableCell colSpan={3} align="right">
                  TVA (20%)
                </TableCell>
                <TableCell colSpan={3} align="left">
                  {format(tax())}
                </TableCell>
              </TableRow>
              <TableRow className="total">
                <TableCell colSpan={4}></TableCell>
                <TableCell colSpan={3} align="right">
                  Total
                </TableCell>
                <TableCell colSpan={3} align="left">
                  {format(total())}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TextField label="Qté" type="number" />
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </div>
    );
  }
}
export default Panier;
