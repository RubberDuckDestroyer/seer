import React, { useContext } from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    makeStyles,
    TableSortLabel,
    Select,
    MenuItem
} from "@material-ui/core";
import moment from "moment";

import AppContext from "../AppContext";
import SearchResultBloc from "../bloc/SearchResultBloc";
import { useBindable } from "../local-libs/data/Bindable";
import SearchBloc from "../bloc/SearchBloc";
import ColumnType from "../libs/enums/ColumnType";
import Enum from "../libs/enums/Enum";
import LoaderBloc from "../bloc/LoaderBloc";

const useStyle = makeStyles(() => ({
    table: {
        minWidth: 650
    }
}));

const SearchResultContainer = () => {

    const classes = useStyle();

    const columnInfo = useContext(AppContext).getBloc(SearchBloc).columnInfo;
    const columns = useBindable(columnInfo.columns);
    const sortingIndex = useBindable(columnInfo.sortingIndex);
    const isAscending = useBindable(columnInfo.isAscending);

    const searchResultBloc = useContext(AppContext).getBloc(SearchResultBloc);
    const results = useBindable(searchResultBloc.results);

    const loaderBloc = useContext(AppContext).getBloc(LoaderBloc);

    const onColumnChange = (index, type) => {
        columnInfo.setColumn(index, type);
    };

    const onSortDirChange = async (index, ascend) => {
        columnInfo.setSort(index, ascend);

        loaderBloc.show();
        await searchResultBloc.requestResults();
        loaderBloc.hide();
    };

    const getRowCellContent = (article, column) => {
        const content = article.getValueForColumn(column);
        if (content instanceof Date) {
            return moment(article.getDate()).format("YYYY-MMMM");
        }
        if (content === null || content === undefined) {
            return "";
        }
        if (content instanceof Enum) {
            return content.name;
        }
        if(typeof (content) !== "string") {
            return String(content);
        }
        return content;
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table
                    className={classes.table}
                    aria-label="Results"
                    style={{
                        tableLayout: "fixed"
                    }}
                >
                    <TableHead>
                        <TableRow>
                            {
                                columns.map((column, colIndex) => {
                                    return (
                                        <TableCell key={column.name + colIndex}>
                                            <Select
                                                className={classes.selectionItem}
                                                value={column}
                                                onChange={(e) => onColumnChange(colIndex, e.target.value)}
                                            >
                                                {
                                                    Object.values(ColumnType).map(type => (
                                                        <MenuItem key={type.name} value={type}>{type.name}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                            <TableSortLabel
                                                active={sortingIndex === colIndex}
                                                direction={isAscending ? "asc" : "desc"}
                                                onClick={() => onSortDirChange(colIndex, !isAscending)}
                                            >
                                            </TableSortLabel>
                                        </TableCell>
                                    );
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            results.map(article => {
                                return (
                                    <TableRow key={article.getTitle()}>
                                        {
                                            columns.map((column, index) => {
                                                const isFirst = index === 0;
                                                const key = column.name + index;
                                                const content = getRowCellContent(article, column);

                                                if (isFirst) {
                                                    return <TableCell key={key} component="th" scope="row">{content}</TableCell>;
                                                }
                                                return <TableCell key={key}>{content}</TableCell>;
                                            })
                                        }
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
export default SearchResultContainer;
