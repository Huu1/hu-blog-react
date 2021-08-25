import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import PublishStep from './PublishStep';
import { useAsync } from 'utils/useAsync';
import { http, useHttp } from 'utils/http';
import { useSelector } from 'react-redux';
import { selectCurrentDraft } from 'store/feature/draftSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }),
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PublishArticle(props: { open: boolean, handleClose: () => any }) {
  const { open, handleClose } = props;
  const classes = useStyles();

  const article = useSelector(selectCurrentDraft);


  const publish = async (data: { category_id: number, description: string, seo_keyword: string }) => {
    const { category_id, description, seo_keyword } = data;
    const result = await http('article', {
      method: 'post', data: {
        ...article,
        seo_keyword,
        description: description || article.content.slice(0, 30),
        category_id
      }
    })
    console.log(result);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              发布文章
            </Typography>
          </Toolbar>
        </AppBar>
        <PublishStep publish={publish} />
      </Dialog>
    </div>
  );
}
