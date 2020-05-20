import React, { useState, useEffect, useContext } from 'react';
import AppContext from "../AppContext";
import LoaderBloc from "../bloc/LoaderBloc";
import { useBindable } from "../local-libs/data/Bindable";
import { makeStyles, Typography } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    container: {
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    loader: {
        color: "white"
    }
}));

const LoaderView = () => {

    const classes = useStyle();

    const loaderBloc = useContext(AppContext).getBloc(LoaderBloc);
    const isShowing = useBindable(loaderBloc.isShowing);

    if (!isShowing) {
        return null;
    }
    return (
        <div className={classes.container}>
            <Typography variant="h5" className={classes.loader}>Loading</Typography>
        </div>
    );
};
export default LoaderView;
