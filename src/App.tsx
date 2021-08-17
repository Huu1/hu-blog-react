
import React from "react";
import { Box, Button } from "@material-ui/core";
import { Header } from "components/Header";
import { Tags } from "components/Tags";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="content" style={{height:'1500px',marginTop:'120px'}}>
        <Tags />
      </main>
    </div>
  );
}

export default App;
