import React, { } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SearchView from "./views/SearchView";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <SearchView/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
