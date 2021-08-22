import React, { Fragment, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Avatar, Button, createTheme, Icon, makeStyles } from "@material-ui/core";
import { ReactComponent as LogoH } from "assets/h.svg";
import { ReactComponent as LogoY } from "assets/y.svg";
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';

import * as _ from 'lodash';

import './index.less';
import { useSticky } from "utils/hooks";
import AlertDialogSlide from "components/Auth/index";
import { useAuth } from "context/auth-provider";
import { Link, useHistory } from "react-router-dom";
import { useHttp } from "utils/http";
import { useAsync } from "utils/useAsync";
import { UserAvatar } from "components/UseAvatar";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});

export const Header = () => {

  const classes = useStyles();

  const { isSticky } = useSticky();

  const [isOpenLogin, setIsOpenLogin] = useState(false);

  const [menu, setMenu] = useState([
    { title: '首页', link: '/' },
    { title: '关于我', link: '/test' },
    { title: '音乐', link: '/music' },
  ]);

  const { user } = useAuth();

  const { run, data, isLoading } = useAsync();

  const client = useHttp();

  const history = useHistory();

  const LiGroup = () => {
    return (
      menu.map((m, index) => <MenuItem key={index}>
        <Link className='hover-underline-animation' to={m.link}>{m.title}</Link>
      </MenuItem>)
    )
  }

  const openLoginModal = () => {
    setIsOpenLogin(true);
  }

  const closeLoginModal = () => {
    setIsOpenLogin(false);
  }

  const goHome = () => {
    history.push('/');
  }

  const toWritePage = () => {
    run(client('draft/new', { method: 'post' })).then((res: any) => {
      const { errorCode: code, id } = res;
      if (code === 0) {
        history.push('/write/' + id);
      } else {

      }
    })
  }
  const userAction = () => {
    return user ?
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          color="primary"
          className={classes.margin}
          disableElevation
          onClick={toWritePage}
          disabled={isLoading}
        >写文章</Button>
        <UserAvatar user={user} />
      </ThemeProvider>
      : <Button onClick={openLoginModal} variant="contained" className={classes.margin} color="secondary">
        Login
      </Button>
  }

  return (
    <header className={`${isSticky ? 'border' : 'border'}`} >
      <div className={`header-wrap container ${isSticky ? 'fixed' : ''}`}>
        <Container className={`flex between container`} >
          <Button onClick={goHome}>
            <LogoH style={{ width: '1rem', height: '2rem' }} />
            <LogoY style={{ width: '1.5rem', height: '2rem' }} />
          </Button>
          <HeadRight className=''>
            <Menu className='flex column-center'>
              {
                LiGroup()
              }
              {
                userAction()
              }
            </Menu>
          </HeadRight>
        </Container>
      </div>

      <AlertDialogSlide open={isOpenLogin} modalClose={closeLoginModal} />
    </header>
  )
}

const HeaderWrap = styled.header`

`

const Container = styled.div`
  /* transition: all 1s ease; */
`
const HeadRight = styled.div`

`
const Menu = styled.ul`
  margin: 0;
  padding:0;
  height: 100%;
`

const MenuItem = styled.li`
  margin: 0 1.2rem;
  list-style: none;
  font-size: 18px;
  font-family: Nunito,sans-serif;
  font-weight: 500;
`
// const Container=styled.div`

// `