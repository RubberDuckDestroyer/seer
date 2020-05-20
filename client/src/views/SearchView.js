import React from 'react';
import { Box } from "@material-ui/core";

import FilterContainer from "../components/FilterContainer";
import DateContainer from "../components/DateContainer";
import SearchResultContainer from "../components/SearchResultContainer";

const SearchView = () => {
  return (
    <div>
      <FilterContainer style={{
        backgroundColor: "#f88",
        height: "64px"
      }} />
      <Box m={1} />
      <DateContainer style={{
        backgroundColor: "#8f8",
        height: "64px"
      }} />
      <Box m={2}/>
      <SearchResultContainer

      />
    </div>
  );
};
export default SearchView;
