import React from 'react';
import FilterContainer from "../components/FilterContainer";
import DateContainer from "../components/DateContainer";

const SearchView = () => {
  return (
    <div>
      <FilterContainer style={{
        backgroundColor: "#f88",
        height: "64px"
      }} />
      <DateContainer style={{
        backgroundColor: "#8f8",
        height: "64px"
      }} />
    </div>
  );
};
export default SearchView;
