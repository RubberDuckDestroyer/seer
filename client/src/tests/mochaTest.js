const expect = require("chai").expect;

describe("Testing Mocha functionality in client", () => {
    it("Tests whether Mocha works in client", () => {
        console.log("== Testing mochaTest in client ==");
        expect(1 + 9).to.equal(10);
    });
});
