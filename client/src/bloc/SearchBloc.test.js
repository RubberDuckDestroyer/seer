import SearchBloc, { SearchFilterInfo } from "./SearchBloc";
import ColumnType from "../libs/enums/ColumnType";

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
        ColumnType.result,
        ColumnType.publicationDate,
        ColumnType.title,
        ColumnType.author,
        ColumnType.doi,
    ];
    defaultColumns.forEach((c, index) => expect(columns[index]).toBe(c));
});

test("Changing result columns", () => {
    const bloc = new SearchBloc();
    const columnInfo = bloc.columnInfo;

    columnInfo.setColumn(0, ColumnType.methodType);
    expect(columnInfo.columns.getValue()[0]).toBe(ColumnType.methodType);
});

test("Preventing multiple columns having the same column type", () => {
    const bloc = new SearchBloc();
    const columnInfo = bloc.columnInfo;

    columnInfo.setColumn(0, ColumnType.methodType);
    expect(columnInfo.columns.getValue()[0]).toBe(ColumnType.methodType);

    expect(columnInfo.columns.getValue()[1]).toBe(ColumnType.publicationDate);
    // Even if the same column is specified, it shouldn't affect the actual data.
    columnInfo.setColumn(1, ColumnType.methodType);
    expect(columnInfo.columns.getValue()[1]).toBe(ColumnType.publicationDate);
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