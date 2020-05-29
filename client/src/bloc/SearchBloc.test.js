import SearchBloc, { SearchFilterInfo } from "./SearchBloc";

test("Change date range", () => {
    const bloc = new SearchBloc();
    bloc.minDate.setValue("2020-05-10");
    bloc.maxDate.setValue("2020-06-11");
    expect(bloc.minDate.getValue()).toBe("2020-05-10");
    expect(bloc.maxDate.getValue()).toBe("2020-06-11");
});
test("Adding new filters", () => {
    const bloc = new SearchBloc();
    expect(bloc.filters.getValue().length).toBe(1);
    expect(bloc.joints.getValue().length).toBe(0);

    bloc.addFilter();
    expect(bloc.filters.getValue().length).toBe(2);
    expect(bloc.joints.getValue().length).toBe(1);

    const firstFilter = bloc.filters.getValue()[0];
    bloc.removeFilter(firstFilter)
    expect(bloc.filters.getValue().length).toBe(1);
    expect(bloc.joints.getValue().length).toBe(0);
    expect(bloc.filters.getValue()[0]).not.toEqual(firstFilter);
});
