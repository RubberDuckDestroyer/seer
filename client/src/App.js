import React, { } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AppContext from "./AppContext";
import SearchView from "./views/SearchView";

const App = () => {
  return (
    <div>
      <AppContext>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <SearchView/>
            </Route>
          </Switch>
        </BrowserRouter>
      </AppContext>
    </div>
  );
};

export default App;
