import React, { useState, useContext } from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    makeStyles,
    FormControl,
    InputLabel,
    Input,
    Select,
    MenuItem,
    Grid,
    FormHelperText
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import AppContext from "../AppContext";
import SubmitBloc from "../bloc/SubmitBloc";
import LoaderBloc from "../bloc/LoaderBloc";

const useStyles = makeStyles(() => ({
  form: {
    width: "100%",
  }
}));

function isValidStringInput(value) {
  return typeof (value) !== "string" || value.length <= 0;
}

const SubmissionView = () => {

  const classes = useStyles();
  const history = useHistory();

  const submitBloc = useContext(AppContext).getBloc(SubmitBloc);
  const loaderBloc = useContext(AppContext).getBloc(LoaderBloc);

  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [source, setSource] = useState("");
  const [volume, setVolume] = useState("");
  const [issue, setIssue] = useState("");
  const [pages, setPages] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [type, setType] = useState("Article");
  const [doi, setDoi] = useState("");
  const [website, setWebsite] = useState("");

  const [failedSubmit, setFailedSubmit] = useState(false);

  const isErrorTitle = failedSubmit && isValidStringInput(title);
  const isErrorYear = !(/^[0-9]+$/).exec(year);
  const isErrorAuthors = failedSubmit && isValidStringInput(authors);
  const isErrorSource = failedSubmit && isValidStringInput(source);

  const isDoiShown = type === "Article" || type === "Proceeding";
  const isWebsiteShown = type === "Website";

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onAuthorsChange = (e) => {
    setAuthors(e.target.value);
  };
  const onSourceChange = (e) => {
    setSource(e.target.value);
  };
  const onVolumeChange = (e) => {
    setVolume(e.target.value);
  };
  const onIssueChange = (e) => {
    setIssue(e.target.value);
  };
  const onPagesChange = (e) => {
    setPages(e.target.value);
  };
  const onYearChange = (e) => {
    setYear(e.target.value);
  };
  const onTypeChange = (e) => {
    setType(e.target.value);
  };
  const onDoiChange = (e) => {
    setDoi(e.target.value);
  };
  const onWebsiteChange = (e) => {
    setWebsite(e.target.value);
  };

  const onUploadButton = () => {

  };
  const onSubmitButton = async () => {
    loaderBloc.show();
    const result = await submitBloc.submit({
      AUTHOR: authors,
      SOURCE: source,
      TITLE: title,
      YEAR: year,
      type,
      DOI: doi,
      ISSUE: issue,
      PAGES: pages,
      URL: website,
      VOLUME: volume
    });
    loaderBloc.hide();

    if (result) {
      history.push("/submitted");
    }
    else {
      setFailedSubmit(true);
    }
  };

  return (
    <Container align="center">
      <Typography variant="h4" align="center">Submit an Article</Typography>
      <Box m={1} />
      <Button color="primary" variant="contained" onClick={onUploadButton}>Upload Bibtex</Button>
      <Box m={1}/>
      <Container>
        <form className={classes.form} noValidate autoComplete="off">
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="title-input" shrink error={isErrorTitle}>Title*</InputLabel>
                <Input id="title-input" value={title} error={isErrorTitle} fullWidth required onChange={onTitleChange} />
                {
                  isErrorTitle &&
                  <FormHelperText id="year-input-error" error>Field required</FormHelperText>
                }
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="authors-input" shrink error={isErrorAuthors}>Authors*</InputLabel>
                <Input id="authors-input" value={authors} error={isErrorAuthors} fullWidth required onChange={onAuthorsChange} />
                {
                  isErrorAuthors &&
                  <FormHelperText id="year-input-error" error>Field required</FormHelperText>
                }
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="year-input" shrink error={isErrorYear}>Year*</InputLabel>
                <Input id="year-input" type="number" fullWidth error={isErrorYear} required value={year} onChange={onYearChange} />
                {
                  isErrorYear &&
                  <FormHelperText id="year-input-error" error>Enter a valid year.</FormHelperText>
                }
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <FormControl fullWidth>
                <InputLabel htmlFor="source-input" shrink error={isErrorSource}>Source*</InputLabel>
                <Input id="source-input" value={source} fullWidth error={isErrorSource} required onChange={onSourceChange} />
                {
                  isErrorSource &&
                  <FormHelperText id="year-input-error" error>Field required</FormHelperText>
                }
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="volume-input" shrink>Volume</InputLabel>
                <Input id="volume-input" type="number" fullWidth value={volume} onChange={onVolumeChange} />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="issue-input" shrink>Issue</InputLabel>
                <Input id="issue-input" type="number" fullWidth value={issue} onChange={onIssueChange} />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="page-input" shrink>Pages</InputLabel>
                <Input id="page-input" fullWidth value={pages} onChange={onPagesChange} />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="type-selection">Type*</InputLabel>
                <Select id="type-selection" fullWidth value={type} onChange={onTypeChange}>
                  <MenuItem value="Article">Article</MenuItem>
                  <MenuItem value="Book">Book</MenuItem>
                  <MenuItem value="Proceeding">Proceeding</MenuItem>
                  <MenuItem value="Website">Website</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              {
                isDoiShown &&
                <FormControl fullWidth>
                  <InputLabel htmlFor="doi-input" shrink>DOI</InputLabel>
                  <Input id="doi-input" fullWidth value={doi} onChange={onDoiChange} />
                </FormControl>
              }
              {
                isWebsiteShown &&
                <FormControl fullWidth>
                  <InputLabel htmlFor="website-input" shrink>URL</InputLabel>
                  <Input id="website-input" fullWidth value={website} onChange={onWebsiteChange} />
                </FormControl>
              }
            </Grid>
            <Box m={1}/>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" color="secondary" onClick={onSubmitButton}>Submit article</Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Container>
  );
};
export default SubmissionView;

/*
<form className={classes.root} noValidate autoComplete="off">
    <FormControl fullWidth>
        <InputLabel htmlFor="component-simple">Name</InputLabel>
        <Input id="component-simple" value={name} onChange={handleChange} />
    </FormControl>
    <FormControl fullWidth>
        <InputLabel htmlFor="component-helper">Name</InputLabel>
        <Input
            id="component-helper"
            value={name}
            onChange={handleChange}
            aria-describedby="component-helper-text"
        />
        <FormHelperText id="component-helper-text">Some important helper text</FormHelperText>
    </FormControl>
    <FormControl disabled>
        <InputLabel htmlFor="component-disabled">Name</InputLabel>
        <Input id="component-disabled" value={name} onChange={handleChange} />
        <FormHelperText>Disabled</FormHelperText>
    </FormControl>
    <FormControl error>
        <InputLabel htmlFor="component-error">Name</InputLabel>
        <Input
            id="component-error"
            value={name}
            onChange={handleChange}
            aria-describedby="component-error-text"
        />
        <FormHelperText id="component-error-text">Error</FormHelperText>
    </FormControl>
    <FormControl variant="outlined">
      <InputLabel htmlFor="component-outlined">Name</InputLabel>
      <OutlinedInput id="component-outlined" value={name} onChange={handleChange} label="Name" />
    </FormControl>
    <FormControl variant="filled">
      <InputLabel htmlFor="component-filled">Name</InputLabel>
      <FilledInput id="component-filled" value={name} onChange={handleChange} />
    </FormControl>
</form>
*/
