import { expect } from "chai";
import { describe, it } from "mocha";

import FilterJointType from "./FilterJointType";

describe("Tests FilterJointType", () => {
    it("Tests whether operation returns correct results", () => {
        const and = FilterJointType.and.evaluate({}, 0, 1);
        const or = FilterJointType.or.evaluate({}, 0, 1);
        const notAnd = FilterJointType.notAnd.evaluate({}, 0, 1);
        const notOr = FilterJointType.notOr.evaluate({}, 0, 1);

        expect(and.$and).to.eql([0, 1]);
        expect(or.$or).to.eql([0, 1]);
        expect(notAnd.$or).to.eql([{ $nor: [0] }, { $nor: [1] }]);
        expect(notOr.$nor).to.eql([0, 1]);
    });
});
