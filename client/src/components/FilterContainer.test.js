import FilterContainer from "./FilterContainer";
import { render } from "@testing-library/react";
import { Button } from "@material-ui/core";
import React from "react";
import { SearchFilterInfo } from "../bloc/SearchBloc";
import sinon from "sinon"
import { mount } from "enzyme"

test("Plus Button Exists", () => {
  const { queryByTestId } = render(
    <FilterContainer style={{}} searchFilter={new SearchFilterInfo()} />
  );
  expect(queryByTestId(/filterPlus/i)).toBeTruthy();
});

test("Minus Button Exists", () => {
  const { queryByTestId } = render(
    <FilterContainer style={{}} searchFilter={new SearchFilterInfo()} />
  );
  expect(queryByTestId(/filterMinus/i)).toBeTruthy();
});

test("Minus Button can click", () => {

  const spy = sinon.spy();
  const container = mount((<FilterContainer style={{}} searchFilter={new SearchFilterInfo()} onMinusButton={spy} />));

  container
    .find("#filterMinus")
    .first("button")
    .simulate("click");

  expect(spy.calledOnce).toBe(true);
});

test("Plus Button can click", () => {

  const spy = sinon.spy();
  const container = mount((<FilterContainer style={{}} searchFilter={new SearchFilterInfo()} onPlusButton={spy} />));

  container
    .find("#filterPlus")
    .first("button")
    .simulate("click");

  expect(spy.calledOnce).toBe(true);
});