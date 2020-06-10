import React, { useContext } from 'react';
import {
  Box, Button, makeStyles, Container, Typography
} from "@material-ui/core";

import FilterContainer from "../components/FilterContainer";
import DateContainer from "../components/DateContainer";
import SearchResultContainer from "../components/SearchResultContainer";
import AppContext from "../AppContext";
import SearchResultBloc from "../bloc/SearchResultBloc";
import LoaderBloc from "../bloc/LoaderBloc";
import SearchBloc from "../bloc/SearchBloc";
import ConditionContainer from "../components/ConditionContainer";
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
  const searchJoints = useBindable(searchBloc.joints);

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
      <Typography variant="h4" align="center">Search articles</Typography>
      <Box m={1} />
      {
        searchFilters.map((f, index) => {
          const getFilterContainer = () => (
            <FilterContainer
              key={f.key}
              searchFilter={f}
              style={{
                minHeight: "3rem"
              }}
              onPlusButton={() => onFilterPlusButton()}
              onMinusButton={() => onFilterMinusButton(f)}
            />
          );

          if(index < searchJoints.length) {
            const joint = searchJoints[index];
            return [
              getFilterContainer(),
              <ConditionContainer
                key={joint.key}
                jointFilter={joint}
                style={{
                  margin: "0.5rem 0",
                }}
              />
            ];
          }
          return getFilterContainer();
        })
      }
      <Box m={3} />
      <DateContainer style={{
        margin: "0.5rem 0",
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
