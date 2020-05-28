import React from "react";
import { mount } from "enzyme"
import AppContext, { createAppContextValue } from "../AppContext";
import SearchView from "./SearchView";
import SearchBloc from "../bloc/SearchBloc";
import FilterContainer from "../components/FilterContainer";

test("Multiple filters can be created", () => {
    const contextValue = createAppContextValue();
    const searchBloc = contextValue.getBloc(SearchBloc);

    const container = mount(
        <AppContext.Provider value={contextValue}>
            <SearchView/>
        </AppContext.Provider>
    );
    expect(container.find(FilterContainer).length).toBe(1);

    searchBloc.addFilter();
    container.update();
    expect(container.find(FilterContainer).length).toBe(2);
});
