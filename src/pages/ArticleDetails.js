import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  media: {
    height: 140,
    maxWidth: 200,
    marginLeft: 100,
    marginRight: 50,
    marginBottom: 20,
  },
  card: {
    maxWidth: 400,
    marginLeft: 20,
    marginTop: 20,
  },
});

function ArticleDetails(match) {
  const classes = useStyles();
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

  console.log(article);
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {article.title}
        </Typography>
        {/* <CardMedia
          className={classes.media}
          image={article.image}
          title="product image"
        /> */}
        <img
          src={article.image}
          className={classes.media}
          alt="photo_article"
        ></img>
        <Typography variant="body2" color="textSecondary" component="p">
          {article.description}
        </Typography>
        <Typography variant="body1" color="textSecondary" component="p">
          {article.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button //onClick={props.acheter}
          color="primary"
          variant="contained"
        >
          Acheter
        </Button>
      </CardActions>
    </Card>
  );
}

export default ArticleDetails;
