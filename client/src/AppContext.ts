import { createContext } from "react";
import { BlocContextValue } from "bindable-bloc";
import SearchBloc from "./bloc/SearchBloc";
import SearchResultBloc from "./bloc/SearchResultBloc";
import LoaderBloc from './bloc/LoaderBloc';
import SubmitBloc from './bloc/SubmitBloc';

const search = new SearchBloc();
const searchResult = new SearchResultBloc(search);
const submit = new SubmitBloc();
const loader = new LoaderBloc();

export const createAppContextValue = () => (new BlocContextValue({
  search,
  searchResult,
  submit,
  loader
}));

export const AppContextValue = createAppContextValue();
const AppContext = createContext(AppContextValue);
export default AppContext;
