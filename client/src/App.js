import React, { } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AppContext, { AppContextValue } from "./AppContext";
import SearchView from "./views/SearchView";
import LoaderView from "./views/LoaderView";

const App = () => {
  return (
    <div>
      <AppContext.Provider value={AppContextValue}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <SearchView/>
            </Route>
          </Switch>
        </BrowserRouter>

        <LoaderView/>
      </AppContext.Provider>
    </div>
  );
};

export default App;
