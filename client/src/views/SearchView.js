import React, { useContext } from 'react';
import {
  Box, Button, makeStyles, Container
} from "@material-ui/core";

import FilterContainer from "../components/FilterContainer";
import DateContainer from "../components/DateContainer";
import SearchResultContainer from "../components/SearchResultContainer";
import AppContext from "../AppContext";
import SearchResultBloc from "../bloc/SearchResultBloc";
import LoaderBloc from "../bloc/LoaderBloc";
import SearchBloc from "../bloc/SearchBloc";
import { useBindable } from "../local-libs/data/Bindable";

const useStyle = makeStyles(() => ({
  searchContainer: {
    display: "flex",
    justifyContent: "center"
  },
  searchButton: {
    width: 300
  }
}));

const SearchView = () => {

  const searchBloc = useContext(AppContext).getBloc(SearchBloc);
  const searchResultBloc = useContext(AppContext).getBloc(SearchResultBloc);
  const loaderBloc = useContext(AppContext).getBloc(LoaderBloc);

  const searchFilters = useBindable(searchBloc.filters);

  const classes = useStyle();

  const onSearchButton = async () => {
    loaderBloc.show();
    await searchResultBloc.requestResults();
    loaderBloc.hide();
  };

  const onFilterPlusButton = () => {
    searchBloc.addFilter();
  };

  const onFilterMinusButton = (filter) => {
    searchBloc.removeFilter(filter);
  };

  return (
    <Container>
      {
        searchFilters.map(f => (
          <FilterContainer
            key={f.key}
            style={{
              backgroundColor: "#f88",
            }}
            searchFilter={f}
            onPlusButton={() => onFilterPlusButton()}
            onMinusButton={() => onFilterMinusButton(f)}
          />
        ))
      }
      <Box m={3} />
      <DateContainer style={{
        backgroundColor: "#8f8",
        padding: "10px"
      }} />
      <Box m={2} />
      <Box className={classes.searchContainer}>
        <Button className={classes.searchButton} onClick={onSearchButton} color="primary" variant="contained">Search</Button>
      </Box>
      <Box m={2} />
      <SearchResultContainer />
    </Container>
  );
};
export default SearchView;
