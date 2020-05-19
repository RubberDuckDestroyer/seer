const expect = require("chai").expect;

describe("Testing Mocha functionality", () => {
    it("Tests whether Mocha works", () => {
        console.log("== Testing mochaTest ==");
        expect(1 + 9).to.equal(10);
    });
});
