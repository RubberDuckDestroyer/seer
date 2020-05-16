import { createContext } from 'react';
import CounterBloc from "./bloc/CounterBloc.ts";
import BlocContextValue from "./libs/bloc/BlocContextValue.ts";

const counter = new CounterBloc();

const ContextValue = new BlocContextValue({
    counter
});

const MyContext = createContext(ContextValue);
export default MyContext;
