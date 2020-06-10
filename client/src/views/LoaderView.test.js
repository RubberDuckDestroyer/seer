import React from "react";
import AppContext, { createAppContextValue } from "../AppContext";
import LoaderBloc from "../bloc/LoaderBloc";
import { mount } from "enzyme";
import LoaderView from "./LoaderView";
import { act } from "react-dom/test-utils";
import { Typography } from "@material-ui/core";

test("LoaderView reflects default values", () => {
    const contextValue = createAppContextValue();
    const loaderBloc = contextValue.getBloc(LoaderBloc);
    const view = mount(
        <AppContext.Provider value={contextValue}>
            <LoaderView/>
        </AppContext.Provider>
    );
    expect(view.isEmptyRender()).toBeTruthy();
});

test("LoaderView toggles on/off", () => {
    const contextValue = createAppContextValue();
    const loaderBloc = contextValue.getBloc(LoaderBloc);
    const view = mount(
        <AppContext.Provider value={contextValue}>
            <LoaderView/>
        </AppContext.Provider>
    );

    act(() => loaderBloc.show());
    view.mount();
    expect(view.isEmptyRender()).toBeFalsy();

    const texts = view.find(Typography);
    expect(texts.length).toBe(1);
    expect(texts.at(0).text()).toBe("Loading");

    act(() => loaderBloc.hide());
    view.mount();
    expect(view.isEmptyRender()).toBeTruthy();
});