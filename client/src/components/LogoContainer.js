import React, { } from "react";
import { Container, Button } from "@material-ui/core";

import logo from "../images/logo.png";

const LogoContainer = () => {
  return (
    <Container style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem',
    }}>
      <Button onClick={() => { window.location.replace("\\"); }}>
        <img src={logo} alt="missing image" style={{ height: '120px' }} />
      </Button>
    </Container>
  );
};

export default LogoContainer;
