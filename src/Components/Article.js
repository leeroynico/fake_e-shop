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
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addArticle } from "../redux/cart/cart.actions";

const useStyles = makeStyles({
  media: {
    height: 140,
  },
  card: {
    maxWidth: 200,
    marginLeft: 20,
    marginTop: 20,
  },
});

function Article(props) {
  const { cart, addItem } = props;
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <CardMedia
            className={classes.media}
            image={props.image}
            title="productimage"
          />
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={() => addItem(props)}
          size="small"
          color="primary"
          variant="contained"
        >
          Acheter
        </Button>
        <Button
          component={Link}
          to={"article/" + props.link}
          size="small"
          color="primary"
          variant="contained"
        >
          infos
        </Button>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addArticle(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);
