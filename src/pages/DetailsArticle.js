import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Article from "../Components/Article";

function DetailsArticle(match) {
  const [article, setarticle] = useState("");
  async function getArticleDetails() {
    const response = await axios.get(
      `https://fakestoreapi.com/products/${match.match.params.id}`
    );
    setarticle(response.data);
  }
  useEffect(() => {
    getArticleDetails();
  }, []);

  return (
    <div>
      <Article
        key={"article-" + article.id}
        title={article.title}
        image={article.image}
        description={article.description}
        link={article.id}
        price={article.price}
      //  acheter={acheter}
      />
    </div>
  );
}

export default DetailsArticle;
