import React from "react";
import Article from "./Article";
import axios from "axios";
import Panier from "./Panier";
import { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
let url = "https://fakestoreapi.com/products";

function Boutique() {
  const [boutique, setBoutique] = useState([]);

  //récupération des datas
  async function getProducts() {
    try {
      const response = await axios.get(url);
      setBoutique(response.data);
    } catch (error) {
      console.error("message erreur fetch : " + error);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);

  //panier
  const [panier, setpanier] = useState([]);
  const acheter = (item) => {
    setpanier([...panier, item]);
  };

  //pagination
  const [articlesParPage, setarticlesParPage] = useState(5);
  const [startSlice, setstartSlice] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  const [lastPage, setlastPage] = useState(0);
  useEffect(() => {
    setlastPage(Math.ceil(boutique.length / articlesParPage));
  }, [boutique]);
  console.log(panier);

  return (
    <div>
      <Panier panier={panier} />;
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
      <button
        onClick={function write() {
          axios
            .post("/product", {
              firstName: "Fred",
              lastName: "Flintstone",
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        ecrire dans db.json
      </button>
    </div>
  );
}

export default Boutique;
