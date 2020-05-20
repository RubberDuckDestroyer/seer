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

const useStyle = makeStyles((theme) => ({
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
                            <TableCell>SE Methodology</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            results.map(article => {
                                console.log(`Date: ${moment(article.getDate()).format("YYYY mm")}, title: ${article.getTitle()}, author: ${article.getAuthor()}, methodology: ${article.getMethodologyType().name}`);
                                return (
                                    <TableRow key={article.getTitle()}>
                                        <TableCell component="th" scope="row">
                                            {moment(article.getDate()).format("YYYY mm")}
                                        </TableCell>
                                        <TableCell>{article.getTitle()}</TableCell>
                                        <TableCell>{article.getAuthor()}</TableCell>
                                        <TableCell>{article.getMethodologyType().name}</TableCell>
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
