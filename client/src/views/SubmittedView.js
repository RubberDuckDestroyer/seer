import React from 'react';
import { Container, Typography, Box, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const SubmittedView = () => {

  const history = useHistory();

  const onSearchButton = () => history.push("/");
  const onSubmitButton = () => history.push("/submit");

  return (
    <Container align="center">
      <Typography variant="h4">Article submitted.</Typography>
      <Box m={2}/>
      <Typography>Thank you for submitting an article.</Typography>
      <Typography>The article will be moderated and analyzed before being shown in the search results.</Typography>
      <Box m={3} />
      <Button color="primary" variant="contained" onClick={onSearchButton}>Search articles</Button>
      <Box m={1}/>
      <Button color="secondary" variant="contained" onClick={onSubmitButton}>Submit another</Button>
    </Container>
  );
};
export default SubmittedView;
