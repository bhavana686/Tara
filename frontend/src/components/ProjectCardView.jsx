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

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link
          to={"/Projectmainpage/" + props.projectId}
          className="remove-link-style"
        >
          <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.projectName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {/* Lorem ipsum, or lipsum as it is sometimes known, is dummy text
              used in laying out print, graphic or web designs. The passage is
              attributed to an unknown typesetter in the 15th century who is
              book. */}
              {props.projectDesc}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions>
        <Link
          to={"/Projectmainpage/" + props.projectId}
          className="remove-link-style"
        >
          <Button size="small" color="primary">
            View Project
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
