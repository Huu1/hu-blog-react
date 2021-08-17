import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button, makeStyles } from "@material-ui/core";

import * as _ from 'lodash';

import { CSSTransition } from 'react-transition-group';

import './index.less';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(.3),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export const Header = () => {

  const classes = useStyles();

  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const scroll = () => {
      if (document.documentElement.scrollTop) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    }
    document.addEventListener('scroll',  scroll);
    return () => {
      window.removeEventListener('scroll',_.throttle(scroll,300))
    }
  }, [])


  const [menu, setMenu] = useState([
    'home', 'about', 'me', 'me', 'apple', 'orange'
  ]);

  const LiGroup = () => {
    return (
      menu.map((m, index) => <MenuItem key={index}>{m}</MenuItem>)
    )
  }

  return (
    <CSSTransition in={isSticky} timeout={200} classNames="head">
      <header>
        <Container className={`flex between container`} >
          <Logo className=""></Logo>
          <HeadRight className=''>
            <Menu className='flex column-center'>
              {
                LiGroup()
              }
              <Button variant="outlined" color='primary' className={classes.margin}>注册</Button>
              <Button variant="contained" className={classes.margin} color="secondary">
                登录
              </Button>
            </Menu>
          </HeadRight>

        </Container>
      </header>
    </CSSTransition>

  )
}

const HeaderWrap = styled.header`

`

const Container = styled.div`
  /* transition: all 1s ease; */
`
const Logo = styled.div`
  height: 50px;
  width: 150px;
  background-color: slateblue;
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