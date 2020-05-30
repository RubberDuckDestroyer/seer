import { expect } from "chai";
import { describe, it } from "mocha";

import DateUtils from "./DateUtils";

describe("Tests DateUtils library", () => {
    it("Tests whether toUTC works with string param", () => {
        const date = DateUtils.toUTC("2020-05-05");
        expect(date.getUTCFullYear()).to.equal(2020);
        expect(date.getUTCMonth() + 1).to.equal(5);
        expect(date.getUTCDate()).to.equal(5);
        expect(date.getUTCHours()).to.equal(0);
        expect(date.getUTCMinutes()).to.equal(0);
        expect(date.getUTCSeconds()).to.equal(0);
    });
    it("Tests whether toUTC works with date param", () => {
        const date = DateUtils.toUTC(new Date("2020-05-05"));
        expect(date.getUTCFullYear()).to.equal(2020);
        expect(date.getUTCMonth() + 1).to.equal(5);
        expect(date.getUTCDate()).to.equal(5);
        expect(date.getUTCHours()).to.equal(0);
        expect(date.getUTCMinutes()).to.equal(0);
        expect(date.getUTCSeconds()).to.equal(0);
    });
    it("Tests whether date can be validated", () => {
        expect(DateUtils.isValidDate(new Date())).to.equal(true);
        expect(DateUtils.isValidDate("2020-05-05")).to.equal(true);
        expect(DateUtils.isValidDate("dffddba")).to.equal(false);
    });
});
