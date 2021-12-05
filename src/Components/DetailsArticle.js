import React from "react";
import Article from "./Article";

function DetailsArticle() {
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
        acheter={acheter}
      />
    </div>
  );
}

export default DetailsArticle;
