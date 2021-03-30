import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

let url = "https://fakestoreapi.com/products";

function Shop() {
  const [shop, setShop] = useState([]);

  async function getProducts() {
    try {
      const response = await axios.get(url);
      setShop(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("message erreur fetch : " + error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  //pagination
  const [articlesParPage, setarticlesParPage] = useState(6);
  const [startSlice, setstartSlice] = useState(0);
  let listReduitesArticles = shop.slice(startSlice, articlesParPage);
  const [currentPage, setcurrentPage] = useState(1);
  const [lastPage, setlastPage] = useState(0);

  useEffect(() => {
    setlastPage(Math.ceil(shop.length / articlesParPage));
  }, [shop]);

  return (
    <div>
      <ul>
        {listReduitesArticles.map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
      {
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
      }
      <span>
        {currentPage} / {lastPage}
      </span>
      {
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
      }
    </div>
  );
}

export default Shop;
