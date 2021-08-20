import { Button, makeStyles } from "@material-ui/core";
import React from "react";


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(.5),
  }
}));

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

export const ReactionButtons = ({ article }: any) => {

  const classes = useStyles();


  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <Button variant="outlined" key={name} size="small" className={classes.margin}>
        {emoji} {article.reactions[name]}
      </Button>
    )
  })

  return <div>{reactionButtons}</div>
}