import React, { useState } from 'react';
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
import { Button, Dialog, DialogContent, DialogProps, DialogTitle, Fade, Popover, Tooltip, Typography } from '@material-ui/core';
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
    typography: {
      padding: theme.spacing(.5),
    },
  }),
);



export default function DraftList(props: any) {

  const { open, onHandleClose, data, onDelHandle } = props;

  const classes = useStyles();
  const [dense] = React.useState(false);
  const [maxWidth] = React.useState<DialogProps['maxWidth']>('md');
  const [scroll] = React.useState<DialogProps['scroll']>('paper');

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const [currentId, setCurrentId] = useState<number | null>(null);

  const handleClose = () => {
    onHandleClose();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setCurrentId(id);
  };

  const openPopover = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const popoverClose = () => {
    setAnchorEl(null);
    setCurrentId(null);
  };

  const onDelHandleClick = () => {
    onDelHandle(currentId);
    popoverClose();
  }


  function generate(data: any[] = []) {
    if(data.length===0) {
      return  <div className={classes.root}>{'暂无草稿'}</div>
    }
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
            <IconButton edge="end" aria-label="delete" onClick={(e) => { handleClick(e, value.id) }}>
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

      <Popover
        id={id}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={popoverClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>
          <Button color="secondary" onClick={onDelHandleClick}>
            确认删除
          </Button>
        </Typography>
      </Popover>
    </Dialog>

  );
}