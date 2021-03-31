import React from "react";
import Article from "./Article";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Box from "@material-ui/core/Box";
import PanierContext from "./PanierContext";

let url = "https://fakestoreapi.com/products";
let urlPanier = "http://localhost:8000/products";

function Boutique() {
  const [boutique, setBoutique] = useState([]);
  //récupération des datas du shop
  async function getProducts() {
    try {
      const response = await axios.get(url);
      setBoutique(response.data);
    } catch (error) {
      console.error("message erreur axios boutique : " + error);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);

  //pagination
  const [articlesParPage, setarticlesParPage] = useState(4);
  const [startSlice, setstartSlice] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  const [lastPage, setlastPage] = useState(0);
  useEffect(() => {
    setlastPage(Math.ceil(boutique.length / articlesParPage));
  }, [boutique]);

  //gestion panier
  const [panier, setPanier] = useContext(PanierContext);
  function acheter(product) {
    setPanier((previousProduct) => [...previousProduct, product]);
  }

  return (
    <div>
      <Box display="flex" justifyContent="space-around" align-item="center">
        {boutique.slice(startSlice, articlesParPage).map((article) => (
          <Article
            key={"article" + article.id}
            title={article.title}
            image={article.image}
            description={article.description}
            link={article.id}
            price={article.price}
            acheter={acheter}
          />
        ))}
      </Box>
      <button
        onClick={function change(e) {
          if (currentPage < 2) {
            e.preventDefault();
          } else {
            setstartSlice(startSlice + 6);
            setarticlesParPage(articlesParPage + 6);
            setcurrentPage(currentPage - 1);
          }
        }}
      >
        previous
      </button>
      <span>
        {currentPage} / {lastPage}
      </span>
      <button
        onClick={function change(e) {
          if (currentPage >= lastPage) {
            e.preventDefault();
          } else {
            setstartSlice(startSlice - 6);
            setarticlesParPage(articlesParPage - 6);
            setcurrentPage(currentPage + 1);
          }
        }}
      >
        next
      </button>
    </div>
  );
}

export default Boutique;
