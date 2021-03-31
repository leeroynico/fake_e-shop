import React, { useContext } from "react";
import { PanierContext } from "../PanierContext";
import {
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@material-ui/core";

function Panier() {
  const [panier] = useContext(PanierContext);
  if (panier.length == 0) {
    return <div> le panier est vide </div>;
  } else {
    return (
      <div>
        {panier.map((article) => (
          <span>
            {article.title} {article.price}
          </span>
        ))}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  nom de l'article
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default Panier;
