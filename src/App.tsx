
import React from "react";
import { Header } from "components/Header";
import { ArticleBrief } from "components/Article/ArticleDetail";
import styled from "@emotion/styled";
import { ActionCard } from "components/ActionCard";



function App() {
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
      <Footer />
    </div>
  );
}

export default App;

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
