import React from "react";
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
import { connect } from "react-redux";
import { addArticle } from "../redux/cart/cart.actions";

const useStyles = makeStyles({
  media: {
    height: 140,
  },
  card: {
    maxWidth: 350,
    marginLeft: 20,
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "rgba(240, 188, 212,0.35)",
  },
});

function ArticleDetailFullPage(props) {
  const { cart, addItem } = props;
  const classes = useStyles();
  const alreadyInCart = cart.articles.filter(
    (item) => item.id === props.article.id
  );

  return (
    <>
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography guttrBottom variant="h5" component="h2">
              {props.article.title}
            </Typography>
            <CardMedia
              className={classes.media}
              image={props.article.image}
              title="productimage"
            />
            <Typography variant="body2" color="textSecondary" component="p">
              {props.article.description}
            </Typography>
            <Typography
              variant="h5"
              component="p"
              style={{ marginTop: "10px" }}
            >
              {props.article.price + " €"}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            onClick={() => addItem(props.article)}
            size="small"
            color="primary"
            variant="contained"
          >
            Acheter
          </Button>
          {alreadyInCart[0] && (
            <Typography variant="body2" color="textSecondary">
              déja dans le panier ({alreadyInCart[0].qty})
            </Typography>
          )}
        </CardActions>
      </Card>
    </>
  );
}
const mapStateToProps = (state) => ({
  cart: state.cart,
});
const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addArticle(item)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleDetailFullPage);
