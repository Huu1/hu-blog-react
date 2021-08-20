import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button, makeStyles } from "@material-ui/core";

import * as _ from 'lodash';

import { CSSTransition } from 'react-transition-group';

import './index.less';
import { useSticky } from "utils/hooks";
import AlertDialogSlide from "components/Auth/index";

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

  const { isSticky } = useSticky();

  const [isOpenLogin, setIsOpenLogin] = useState(false);

  const [menu, setMenu] = useState([
    'Home', 'Tags', 'Author', 'Music',
  ]);

  const LiGroup = () => {
    return (
      menu.map((m, index) => <MenuItem key={index}>{m}</MenuItem>)
    )
  }

  const openLoginModal = () => {
    setIsOpenLogin(true);
  }

  const closeLoginModal = () => {
    setIsOpenLogin(false);

  }

  return (
    <header className={`${isSticky ? 'border' : 'border'}`} >
      <div className={`header-wrap container ${isSticky ? 'fixed' : ''}`}>
        <Container className={`flex between container`} >
          <Logo className=""></Logo>
          <HeadRight className=''>
            <Menu className='flex column-center'>
              {
                LiGroup()
              }
              <Button variant="outlined" color='primary' className={classes.margin}>注册</Button>
              <Button onClick={openLoginModal} variant="contained" className={classes.margin} color="secondary">
                登录
              </Button>
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