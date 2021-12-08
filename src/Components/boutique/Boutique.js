import { React, useEffect, useState } from "react";
import Article from "../Article";
import axios from "axios";
import { Box } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { articleOject, setArticle } from "../../redux/article/article.action";
import { connect } from "react-redux";

//const url = "https://fakestoreapi.com/products";

function Boutique(props) {
  const { setArticleToStore, articleFromStore } = props;
  // const [boutique, setBoutique] = useState([]);
  // //récupération des datas du shop
  // async function getProducts() {
  //   try {
  //     const response = await axios.get(url);
  //     setBoutique(response.data);
  //     setArticleToStore(response.data);
  //   } catch (error) {
  //     console.error("message erreur axios boutique : " + error);
  //   }
  // }
  // useEffect(() => {
  //   getProducts();
  // }, []);

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
      <span
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <Pagination
          count={Math.ceil(articleFromStore[0].length / articlesParPage)}
          page={paginationMui}
          onChange={handleChange}
          variant="outlined"
          color="secondary"
          size="large"
        />
      </span>
      <Box display="flex" justifyContent="space-around" align-item="center">
        {articleFromStore[0]
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
const mapStateToProps = (state) => ({
  articleFromStore: state.article,
});

const mapDispatchToProps = (dispatch) => ({
  setArticleToStore: (article) => dispatch(setArticle(article)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Boutique);
