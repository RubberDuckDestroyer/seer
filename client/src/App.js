import React, { } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider, Box } from "@material-ui/core";
import { green, grey } from "@material-ui/core/colors";

import AppContext, { AppContextValue } from "./AppContext";
import SearchView from "./views/SearchView";
import LoaderView from "./views/LoaderView";
import SubmissionView from "./views/SubmissionView";
import Navbar from "./components/Navbar";

const theme = createMuiTheme({
  palette: {
    primary: {
      ...green,
      main: "#2e7d32"
    },
    secondary: grey
  },

});

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={AppContextValue}>
          <BrowserRouter>
            <Navbar />
            <Box m={2}/>
            <Switch>
              <Route exact path="/">
                <SearchView />
              </Route>
              <Route path="/submit">
                <SubmissionView />
              </Route>
            </Switch>
          </BrowserRouter>
          <LoaderView />
        </AppContext.Provider>
      </ThemeProvider>
    </div >
  );
};

export default App;
