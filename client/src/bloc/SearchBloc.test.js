import SearchBloc, { SearchFilterInfo } from "./SearchBloc";
import SortType from "../libs/enums/SortType";

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

test("Validating default search result columns", () => {
    const bloc = new SearchBloc();

    const columnInfo = bloc.columnInfo;
    const columns = columnInfo.columns.getValue();
    expect(columns.length).toBe(5);

    const defaultColumns = [
        SortType.result,
        SortType.publicationDate,
        SortType.title,
        SortType.author,
        SortType.methodologyType,
    ];
    defaultColumns.forEach((c, index) => expect(columns[index]).toBe(c));
});

test("Changing result columns", () => {
    const bloc = new SearchBloc();
    const columnInfo = bloc.columnInfo;

    columnInfo.setColumn(0, SortType.methodType);
    expect(columnInfo.columns.getValue()[0]).toBe(SortType.methodType);
});

test("Validating default sort method", () => {
    const bloc = new SearchBloc();
    const columnInfo = bloc.columnInfo;

    expect(columnInfo.sortingIndex.getValue()).toBe(2);
    expect(columnInfo.isAscending.getValue()).toBe(true);
});

test("Changing sort method", () => {
    const bloc = new SearchBloc();
    const columnInfo = bloc.columnInfo;

    columnInfo.setSort(1, false);
    expect(columnInfo.sortingIndex.getValue()).toBe(1);
    expect(columnInfo.isAscending.getValue()).toBe(false);
});