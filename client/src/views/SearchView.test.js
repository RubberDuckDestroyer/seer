import { render } from "@testing-library/react";
import React from "react";
import FilterContainer from "../components/FilterContainer";
import SearchView from "./SearchView";
import { mount } from "enzyme";

test("Search view contains one filter by default", () => {
  const container = mount(
    <SearchView />
  );
  expect(container.find(FilterContainer).length).toBe(1);
});
