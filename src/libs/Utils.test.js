import Utils from "./Utils";
import { expect } from "chai";

describe("Utils", () => {
  it("Capitalizes the first letter of the string.", () => {
    expect(Utils.capitalize("article")).to.eql("Article");
    expect(Utils.capitalize("8article")).to.eql("8article");
    expect(Utils.capitalize("Article")).to.eql("Article");
  });
});