
import React from "react";
import { Header } from "components/Header";
import { ArticleBrief } from "components/Article/ArticleDetail";
import styled from "@emotion/styled";
import { Fab } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { useAuth } from "context/auth-provider";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { fetchCategory } from "store/feature/categorySlice";
import './index.less'

function Home() {
  const { user } = useAuth();

  return (
    <div className="App">
      <Header />
      <Main className="content container" style={{ marginTop: '150px' }}>
        <div className='pmd'> </div>
        <div className="article-bottom-side">

          <div className="tabTags">
            <ul>
              <div className="top">
                
              </div>
              <li>
                <a >sdfsdf</a>
              </li>
              <li>
                <a >sdfsdf</a>
              </li>
              <li>
                <a >sdfsdf</a>
              </li>
              <li>
                <a >sdfsdf</a>
              </li>
              <li>
                <a >sdfsdf</a>
              </li>
              <div className="bottom"></div>
            </ul>
          </div>
          <MainContent>
            {
              [1, 1, 1, 1, 1, 11,].map((i: any, index: number) => {
                return <ArticleBrief key={index} />
              })
            }
          </MainContent>
        </div>


        {/* <MainSide>
          <ActionCard />
          <ActionCard />
        </MainSide> */}
      </Main>
      {/* {
        user && <Fab className='fix-add' color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      } */}
      <Footer />
    </div>
  );
}

export default Home;

const Main = styled.main`
  display: flex;
  flex-direction: column;
`

const MainContent = styled.aside`
  flex: 1;
`
const MainSide = styled.div`
  margin-left: 40px;
  width: 300px;
  /* outline: 1px solid skyblue; */
`

const Footer = styled.footer`
  height: 150px;
  margin-top: 20px;
  background-color: black;
`


