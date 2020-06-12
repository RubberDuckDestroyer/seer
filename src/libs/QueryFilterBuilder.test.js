import { expect } from "chai";
import { describe, it } from "mocha";
import QueryFilterBuilder from "./QueryFilterBuilder";
import DateUtils from "./DateUtils";

describe("Tests query filter building", () => {
  it("Tests whether query filter can be built successfully with one filter", () => {
    const raw = [
      {
        category: "submission.bibliography.TITLE",
        condition: "Contains",
        value: "a"
      }
    ];
    const result = QueryFilterBuilder.build(raw);
    expect(result).to.eql({
      "submission.bibliography.TITLE": {
        $regex: "a",
        $options: "i"
      }
    });
  });
  it("Tests whether query filter can be built successfully with no filter", () => {
    const result = QueryFilterBuilder.build([]);
    expect(result).to.eql({});
  });
  it("Tests whether query filter can be built successfully with two filters", () => {
    const rawFilters = [
      {
        category: "submission.bibliography.TITLE",
        condition: "Contains",
        value: "a"
      },
      {
        category: "methodType",
        condition: "Is equal to",
        value: "TDD"
      }
    ];
    const rawJoints = [
      "AND"
    ];
    const result = QueryFilterBuilder.build(rawFilters, rawJoints);
    expect(result).to.eql({
      $and: [
        {
          "submission.bibliography.TITLE": {
            $regex: "a",
            $options: "i"
          }
        },
        {
          methodType: "TDD"
        }
      ]
    });
  });
  it("Tests whether query filter can be built successfully with all joint types", () => {
    const rawFilters = [
      {
        category: "submission.bibliography.TITLE",
        condition: "Contains",
        value: "a"
      },
      {
        category: "methodType",
        condition: "Is equal to",
        value: "TDD"
      },
      {
        category: "methodologyType",
        condition: "Is equal to",
        value: "Waterfall"
      },
      {
        category: "submission.bibliography.AUTHOR",
        condition: "Begins with",
        value: "A"
      },
      {
        category: "submission.bibliography.JOURNAL",
        condition: "Contains",
        value: "ieee"
      }
    ];
    const rawJoints = [
      "AND",
      "OR",
      "NOT AND",
      "NOT OR"
    ];
    const result = QueryFilterBuilder.build(rawFilters, rawJoints);
    expect(result).to.eql({
      // AND joint
      $and: [
        {
          "submission.bibliography.TITLE": {
            $regex: "a",
            $options: "i"
          }
        },
        {
          // OR joint
          $or: [
            {
              methodType: "TDD"
            },
            {
              // NOT AND joint
              $or: [
                {
                  $nor: [{
                    methodologyType: "Waterfall"
                  }]
                },
                {
                  $nor: [{
                    // NOT OR joint
                    $nor: [
                      {
                        "submission.bibliography.AUTHOR": {
                          $regex: "^A",
                          $options: "i"
                        }
                      },
                      {
                        "submission.bibliography.JOURNAL": {
                          $regex: "ieee",
                          $options: "i"
                        }
                      }
                    ]
                  }]
                }
              ]
            }
          ]
        }
      ]
    });
  });
  it("Tests whether status filter can be applied appropriately.", () => {
    const query = {};
    QueryFilterBuilder.applyStatusFilter(query, "lol");
    expect(query["submission.statusType"]).eql("lol");

    // Function should just return if not a string type.
    QueryFilterBuilder.applyStatusFilter(query, 3);
    expect(query["submission.statusType"]).eql("lol");
  });
  it("Tests whether date filter can be applied appropriately.", () => {
    let query = {};
    QueryFilterBuilder.applyDateFilter(query, ["hey", "test"]);
    expect(query).eql({});

    // 3 dates should fail.
    QueryFilterBuilder.applyDateFilter(query, [new Date("2010-01-01"), new Date("2020-01-01"), new Date("2020-05-05")]);
    expect(query).eql({});

    QueryFilterBuilder.applyDateFilter(query, [new Date("2010-01-01"), new Date("2020-01-01")]);
    expect(query["submission.bibliography.DATE"].$gte).eql(DateUtils.toUTC("2010-01-01"));
    expect(query["submission.bibliography.DATE"].$lte).eql(DateUtils.toUTC("2020-01-01"));

    query = {};
    QueryFilterBuilder.applyDateFilter(query, ["2010-01-01", "2020-01-01"]);
    expect(query["submission.bibliography.DATE"].$gte).eql(DateUtils.toUTC("2010-01-01"));
    expect(query["submission.bibliography.DATE"].$lte).eql(DateUtils.toUTC("2020-01-01"));
  });
  it("Tests whether sorting filter outputs appropriate options.", () => {
    let result = {};
    result = QueryFilterBuilder.createSortOption(null);
    expect(result).eql({ "submission.bibliography.TITLE": 1 });

    result = QueryFilterBuilder.createSortOption({});
    expect(result).eql({ "submission.bibliography.TITLE": 1 });

    result = QueryFilterBuilder.createSortOption({
      key: "myKey",
      order: "123"
    });
    expect(result).eql({ "submission.bibliography.TITLE": 1 });

    result = QueryFilterBuilder.createSortOption({
      key: "myKey",
      order: 123
    });
    expect(result).eql({ "myKey": 123 });
  });
});
