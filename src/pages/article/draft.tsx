import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import FileCopy from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import { Dialog, DialogContent, DialogProps, DialogTitle } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // flexGrow: 1,
      // maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }),
);



export default function DraftList(props: any) {

  const { open, onHandleClose, data, onDelHandle } = props;

  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('md');
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  const handleClose = () => {
    onHandleClose();
  };


  function generate(data: any[] = []) {
    return data.map((value) => {
      return (
        <ListItem key={value.id}>
          <ListItemAvatar>
            <Avatar>
              <FileCopy />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={value.title || '未命名'}
            secondary={value.created_at || '未知'}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={() => { onDelHandle(value.id) }}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )
    }
    )
  }

  return (
    <Dialog onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      scroll={scroll}
      fullWidth={true}
      maxWidth={maxWidth}
    >
      <DialogTitle id="customized-dialog-title" >
        草稿箱
      </DialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        <Grid item >
          <div className={classes.demo}>
            <List dense={dense}>
              {generate(data)}
            </List>
          </div>
        </Grid>
      </DialogContent>
    </Dialog>

  );
}