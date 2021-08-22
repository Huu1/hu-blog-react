
import React from "react";
import { Header } from "components/Header";
import { ArticleBrief } from "components/Article/ArticleDetail";
import styled from "@emotion/styled";
import { Fab } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { useAuth } from "context/auth-provider";

function Home() {
  const { user } = useAuth();
  return (
    <div className="App">
      <Header />
      <Main className="content container" style={{ marginTop: '150px' }}>
        <MainContent>
          {
            [1, 1, 1, 1, 1, 11,].map((i: any, index: number) => {
              return <ArticleBrief key={index} />
            })
          }
        </MainContent>
        {/* <MainSide>
          <ActionCard />
          <ActionCard />
        </MainSide> */}
      </Main>
      {
        user && <Fab className='fix-add' color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      }
      <Footer />
    </div>
  );
}

export default Home;

const Main = styled.main`
  display: flex;
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


