import React, { useContext } from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    makeStyles
} from "@material-ui/core";
import moment from "moment";

import AppContext from "../AppContext";
import SearchResultBloc from "../bloc/SearchResultBloc";
import { useBindable } from "../local-libs/data/Bindable";

const useStyle = makeStyles(() => ({
    table: {
        minWidth: 650
    }
}));

const SearchResultContainer = () => {

    const classes = useStyle();

    const searchResultBloc = useContext(AppContext).getBloc(SearchResultBloc);
    const results = useBindable(searchResultBloc.results);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="Results">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Authors</TableCell>
                            <TableCell>SE Method</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            results.map(article => {
                                return (
                                    <TableRow key={article.getTitle()}>
                                        <TableCell component="th" scope="row">
                                            {moment(article.getDate()).format("YYYY-MMMM")}
                                        </TableCell>
                                        <TableCell>{article.getTitle()}</TableCell>
                                        <TableCell>{article.getAuthor()}</TableCell>
                                        <TableCell>
                                            {
                                                article.getMethodType() === null ?
                                                    "" :
                                                    article.getMethodType().name
                                            }
                                        </TableCell>
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
