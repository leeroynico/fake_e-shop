import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import ArticleDetailFullPage from "./ArticleDetailFullPage";

function DetailsArticle(match) {
  const [article, setArticle] = useState("");

  async function getArticleDetails() {
    const response = await axios.get(
      `https://fakestoreapi.com/products/${match.match.params.id}`
    );
    setArticle(response.data);
  }
  useEffect(() => {
    getArticleDetails();
  }, []);
  console.log(article);
  return (
    <span style={{ display: "flex", justifyContent: "center" }}>
      {article && <ArticleDetailFullPage article={article} />}
    </span>
  );
}

export default DetailsArticle;
