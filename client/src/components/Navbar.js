import React from "react";
import {
  Toolbar, AppBar, Button, Container
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LogoContainer from "./LogoContainer";

const Navbar = () => {

  const history = useHistory();

  const onSearchButton = () => {
    history.push("/");
  };

  const onSubmitButton = () => {
    history.push("/submit");
  };

  return (
    <AppBar position="static" >
      <Toolbar>
        <Container style={{ flexGrow: 1 }}>
          <LogoContainer />
        </Container>
        <Button color="inherit" onClick={onSearchButton}>Search</Button>
        <Button color="inherit" onClick={onSubmitButton}>Submit</Button>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
