
import Home from "pages/home";
import { Write } from "pages/article/Write";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  useParams
} from "react-router-dom";
import { NotFound } from "components/NotFound/404";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch >
          <Route exact path="/" children={<Home />} />
          <Route exact path="/write/:id" children={<Write />} />
          <Route path="/*" children={<NotFound />} />
          {/* <Route path="/img/:id" children={<ImageView />} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
