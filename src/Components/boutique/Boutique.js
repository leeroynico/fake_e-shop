import { React, useEffect, useState, useContext, useCallback } from "react";
import Article from "../Article";
import axios from "axios";
import Box from "@material-ui/core/Box";
import Pagination from "@material-ui/lab/Pagination";

const url = "https://fakestoreapi.com/products";

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

  //PAGINATION Material UI
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

  return (
    <div>
      <Box display="flex" justifyContent="space-around" align-item="center">
        {boutique
          .slice(paginationMui, paginationMui + articlesParPage)
          .map((article) => (
            <Article
              key={"article-" + article.id}
              id={article.id}
              title={article.title}
              image={article.image}
              description={article.description}
              link={article.id}
              price={article.price}
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
    </div>
  );
}

export default Boutique;
