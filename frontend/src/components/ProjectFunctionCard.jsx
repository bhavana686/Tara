import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
// import Link from "@material-ui/core/Link";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginBottom: 15,
    marginRight: 15,
  },
  media: {
    height: 140,
  },
});

export default function ProjectFunctionCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link to={props.funcPath} className="remove-link-style">
          <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.funcName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.funcDesc}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions>
        <Link to={props.funcPath}>
          <Button size="small" color="primary">
            {props.funcName}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
