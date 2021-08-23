import React, { useEffect, useState } from 'react';
import { createStyles, createTheme, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { ThemeProvider } from '@material-ui/styles';
import './index.less';
import _ from 'lodash';
import { Avatar, Button } from '@material-ui/core';
import { useAuth } from 'context/auth-provider';
import styled from '@emotion/styled';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { UserAvatar } from 'components/UseAvatar';
import DraftList from './draft';
import { useDispatch, useSelector } from 'react-redux';
import { delDrafts, fetchDrafts, selectAllDrafts } from 'store/feature/draftSlice';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(3),
    },
  }),
);

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(255, 255, 255)',
    },
    secondary: {
      main: '#1976d2'
    }
  },
});

export default function WriterTopBar(props: { title: string, onTitleChange: (value: string) => void, loading: boolean }) {
  const { title, onTitleChange, loading } = props;
  const classes = useStyles();
  const { user } = useAuth();
  const history = useHistory()

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  }

  const dispatch = useDispatch();
  const drafts = useSelector(selectAllDrafts);

  const viewDraft = () => {
    if (drafts && drafts.length) {
      setOpen(true);
    } else {
      dispatch(fetchDrafts(
        setOpen(true)
      ))
    }
  }

  const onDelHandle = (id: string) => {
    dispatch(delDrafts({ id }))
  }

  return (
    <div className={classes.root} >
      <ThemeProvider theme={theme} >
        <AppBar position="static" >
          <Toolbar className='flex column-center' >
            <Left className='flex column-center'>
              <IconButton edge="start" onClick={() => { history.push('/') }} className={classes.menuButton} color="inherit" aria-label="menu">
                <ArrowBack style={{ color: "gray" }} />
              </IconButton>
              <input value={title} onChange={(e) => { onTitleChange(e.target.value) }} type="text" className='custom-input' />
            </Left>

            <Right className='column-center'>
              <Info>
                {!loading ? '保存成功' : '保存中...'}
              </Info>
              <Button
                variant="contained"
                color="default"
                className={classes.menuButton}
                startIcon={<DeleteIcon />}
                onClick={viewDraft}
              >
                草稿箱
              </Button>
              <Button variant="contained"
                color="secondary" className={classes.menuButton}>发布文章</Button>
              {
                user && <UserAvatar user={user}></UserAvatar>
              }
            </Right>
          </Toolbar>

        </AppBar>
      </ThemeProvider>


      <DraftList open={open} onHandleClose={handleClose} onDelHandle={onDelHandle} data={drafts} />
    </div>
  );
}


const Left = styled.div`

`
const Info = styled.div`
  margin-right: 20px;
  font-size: 14px;
  color: gray;
`
const Right = styled.div`
  margin-left: auto;
  display: flex;
`