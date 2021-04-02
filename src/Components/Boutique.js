import { React, useEffect, useState, useContext, useCallback } from "react";
import Article from "./Article";
import axios from "axios";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { PanierContext } from "./PanierContext";

let url = "https://fakestoreapi.com/products";

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

  const [currentPage, setcurrentPage] = useState(1);
  const [lastPage, setlastPage] = useState(0);
  useEffect(() => {
    setlastPage(Math.ceil(boutique.length / articlesParPage));
  }, [boutique]);

  //gestion panier
  const [panier, setPanier] = useContext(PanierContext);
  const [count, setCount] = useState(1);
  function acheter(article) {
    const doublon = panier.find((x) => x.title === article.title);
    setCount((count) => count + 1);
    if (!doublon) {
      setPanier((monPanier) => [
        ...monPanier,
        { ...article, qty: 1, idpanier: count },
      ]);
    } else {
      setPanier(
        panier.map((x) =>
          x.title === article.title ? { ...doublon, qty: doublon.qty + 1 } : x
        )
      );
    }
  }

  // PAGINATION Material UI
  const [articlesParPage, setarticlesParPage] = useState(2);
  const [paginationMui, setPaginationMui] = useState(1);
  const [width, setWidth] = useState(0);

  const setResize = useCallback((e) => {
    setWidth(e.target.innerWidth);
  }, []);
  useEffect(() => {
    window.addEventListener("resize", setResize);
    return () => {
      window.removeEventListener("resize", setResize);
    };
  }, [setResize]);
  useEffect(() => {
    width > 800 ? setarticlesParPage(4) : setarticlesParPage(2);
  }, [width]);

  const handleChange = (event, value) => {
    setPaginationMui(value);
  };

  //console.log(boutique.slice(paginationMui, paginationMui + articlesParPage));
  return (
    <div>
      {/* <Grid container justify="center" spacing={2}> */}
      <Box display="flex" justifyContent="space-around" align-item="center">
        {boutique
          .slice(paginationMui, paginationMui + articlesParPage)
          .map((article) => (
            // <Grid item xs={6} md={3}>
            <Article
              key={"article-" + article.id}
              title={article.title}
              image={article.image}
              description={article.description}
              link={article.id}
              price={article.price}
              acheter={acheter}
            />
          ))}
      </Box>
      <Pagination
        count={Math.ceil(boutique.length / articlesParPage)}
        page={paginationMui}
        onChange={handleChange}
        variant="outlined"
        color="secondary"
      />
      {/* <button
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
      </button> */}
      <p>{paginationMui}</p>
    </div>
  );
}

export default Boutique;
