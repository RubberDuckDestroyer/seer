import { createContext } from "react";
import BlocContextValue from "./local-libs/bloc/BlocContextValue";
import SearchBloc from "./bloc/SearchBloc";
import SearchResultBloc from "./bloc/SearchResultBloc";
import LoaderBloc from './bloc/LoaderBloc';

const search = new SearchBloc();
const searchResult = new SearchResultBloc(search);
const loader = new LoaderBloc();

export const AppContextValue = new BlocContextValue({
    search,
    searchResult,
    loader
});

const AppContext = createContext(AppContextValue);
export default AppContext;
