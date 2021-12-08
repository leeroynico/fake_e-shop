import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  media: {
    height: 140,
  },
  card: {
    maxWidth: 200,
    marginLeft: 20,
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "rgba(240, 188, 212,0.35)",
  },
});

function DetailsArticle(match) {
  const classes = useStyles();
  const [article, setarticle] = useState(null);
  const addItem = useSelector((state) => state.cart);
  console.log(addItem);
  async function getArticleDetails() {
    const response = await axios.get(
      `https://fakestoreapi.com/products/${match.match.params.id}`
    );
    setarticle(response.data);
  }
  useEffect(() => {
    getArticleDetails();
  }, []);
  console.log("addItem=>", addItem);
  return (
    <span style={{ display: "flex", justifyContent: "center" }}>
      {article && (
        <Card className={classes.card}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {article.title.length > 20
                  ? `${article.title.slice(0, 20)}...`
                  : article.title}
              </Typography>
              <CardMedia
                className={classes.media}
                image={article.image}
                title="productimage"
              />
              <Typography variant="body2" color="textSecondary" component="p">
                {article.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              onClick={() => addItem(article)}
              size="small"
              color="primary"
              variant="contained"
            >
              Acheter
            </Button>
          </CardActions>
        </Card>
      )}
    </span>
  );
}

export default DetailsArticle;
