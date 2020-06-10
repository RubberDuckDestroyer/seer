import React from "react";
import { mount } from "enzyme";
import SubmissionView from "./SubmissionView";
import { Typography, Button, InputLabel, Input, Select, MenuItem } from "@material-ui/core";

test("Whether the title is displayed on SubmissionView.", () => {
  const component = mount(
      <SubmissionView/>
  );

  const typographies = component.find(Typography);
  expect(typographies.containsMatchingElement(n => n.text() === "Submit an Article")).toBeTruthy();
});

test("Whether the form is displayed correctly.", () => {
  const component = mount(
      <SubmissionView/>
  );

  const buttons = component.find(Button);
  expect(buttons.length).toBe(2);
  expect(buttons.containsMatchingElement(b => b.text() === "Upload Bibtex")).toBeTruthy();
  expect(buttons.containsMatchingElement(b => b.text() === "Submit article")).toBeTruthy();
  
  const inputLabels = component.find(InputLabel);
  expect(inputLabels.containsMatchingElement(l => l.text() === "Title")).toBeTruthy();
  expect(inputLabels.containsMatchingElement(l => l.text() === "Authors")).toBeTruthy();
  expect(inputLabels.containsMatchingElement(l => l.text() === "Source")).toBeTruthy();
  expect(inputLabels.containsMatchingElement(l => l.text() === "Volume")).toBeTruthy();
  expect(inputLabels.containsMatchingElement(l => l.text() === "Issue")).toBeTruthy();
  expect(inputLabels.containsMatchingElement(l => l.text() === "Pages")).toBeTruthy();
  expect(inputLabels.containsMatchingElement(l => l.text() === "Type")).toBeTruthy();
  expect(inputLabels.containsMatchingElement(l => l.text() === "Year")).toBeTruthy();
  expect(inputLabels.containsMatchingElement(l => l.text() === "DOI")).toBeTruthy();

  const inputs = component.find(Input);
  expect(inputs.findWhere(n => n.find("#title-input"))).not.toBeNull();
  expect(inputs.findWhere(n => n.find("#authors-input"))).not.toBeNull();
  expect(inputs.findWhere(n => n.find("#source-input"))).not.toBeNull();
  expect(inputs.findWhere(n => n.find("#volume-input"))).not.toBeNull();
  expect(inputs.findWhere(n => n.find("#issue-input"))).not.toBeNull();
  expect(inputs.findWhere(n => n.find("#pages-input"))).not.toBeNull();
  expect(inputs.findWhere(n => n.find("#year-input"))).not.toBeNull();
  expect(inputs.findWhere(n => n.find("#doi-input"))).not.toBeNull();

  const selects = component.find(Select);
  expect(selects.length).toBe(1);
  expect(selects.findWhere(n => n.find("#type-selection"))).not.toBeNull();
});