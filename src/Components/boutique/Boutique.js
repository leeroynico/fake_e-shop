import { React, useEffect, useState, useContext, useCallback } from "react";
import Article from "../Article";
import axios from "axios";
import { Box } from "@material-ui/core";
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
  const [paginationMui, setPaginationMui] = useState(1);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const articlesParPage =
    windowSize.width > 1200 ? 5 : windowSize.width > 800 ? 4 : 2;

  const handleChange = (event, value) => {
    setPaginationMui(value);
  };

  return (
    <div>
      <Pagination
        count={Math.ceil(boutique.length / articlesParPage)}
        page={paginationMui}
        onChange={handleChange}
        variant="outlined"
        color="secondary"
        style={{ marginTop: "20px" }}
      />
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
    </div>
  );
}

export default Boutique;
