import React from "react";
import { mount } from "enzyme";
import SubmittedView from "./SubmittedView";
import { Typography, Button } from "@material-ui/core";

test("SubmittedView renders the correct displays.", () => {
  const component = mount(
    <SubmittedView/>
  );

  const typographies = component.find(Typography);
  expect(typographies.length).toBe(3);
  expect(typographies.at(0).text()).toBe("Article submitted.");
  expect(typographies.at(1).text()).toBe("Thank you for submitting an article.");
  expect(typographies.at(2).text()).toBe("The article will be moderated and analyzed before being shown in the search results.");

  const buttons = component.find(Button);
  expect(buttons.length).toBe(2);
  expect(buttons.at(0).text()).toBe("Search articles");
  expect(buttons.at(1).text()).toBe("Submit another");
});