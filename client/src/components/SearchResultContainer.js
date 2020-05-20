import React, { useContext } from 'react';
import AppContext from "../AppContext";
import SearchResultBloc from "../bloc/SearchResultBloc";

const SearchResultContainer = () => {

    const searchResultBloc = useContext(AppContext).getBloc(SearchResultBloc);
    console.log(searchResultBloc);

    return (
        <div>

        </div>
    );
};
export default SearchResultContainer;
