import { createContext } from "react";
import BlocContextValue from "./local-libs/bloc/BlocContextValue.ts";
import SearchBloc from "./bloc/SearchBloc.ts";
import SearchResultBloc from "./bloc/SearchResultBloc.ts";

const search = new SearchBloc();
const searchResult = new SearchResultBloc(search);

const contextValue = new BlocContextValue({
    search,
    searchResult
});

const AppContext = createContext(contextValue);
export default AppContext;
