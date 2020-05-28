import React from "react";
import { mount } from "enzyme"
import AppContext, { createAppContextValue } from "../AppContext";
import SearchView from "./SearchView";
import SearchBloc from "../bloc/SearchBloc";
import FilterContainer from "../components/FilterContainer";

test("Search view contains one filter by default", () => {
    const container = mount(
      <SearchView />
    );
    expect(container.find(FilterContainer).length).toBe(1);
});

test("Multiple filters can be created", () => {
    const contextValue = createAppContextValue();
    const searchBloc = contextValue.getBloc(SearchBloc);

    let container = mount(
        <AppContext.Provider value={contextValue}>
            <SearchView />
        </AppContext.Provider>
    );
    expect(container.find(FilterContainer).length).toBe(1);

    container.unmount();
    searchBloc.addFilter();
    
    container = mount(
        <AppContext.Provider value={contextValue}>
            <SearchView />
        </AppContext.Provider>
    );
    expect(container.find(FilterContainer).length).toBe(2);
});