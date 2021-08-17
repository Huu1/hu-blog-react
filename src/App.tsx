
import React from "react";
import { Box, Button } from "@material-ui/core";
import { Header } from "components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content" style={{height:'1500px'}}></div>
    </div>
  );
}

export default App;
