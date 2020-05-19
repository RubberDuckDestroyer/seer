import Enum from "./Enum";
import RegexUtils from "../RegexUtils";

export class FilterConditionEnum extends Enum {

    constructor({ name, queryTargetBuilder }) {
        super(name);
        this.queryTargetBuilder = queryTargetBuilder;
    }

    getQueryTarget(value) {
        if (typeof (this.queryTargetBuilder) === "function") {
            return this.queryTargetBuilder(value);
        }
        return value;
    }
}

const FilterConditionType = {
    isEqualTo: new FilterConditionEnum({
        name: "Is equal to"
    }),

    isLessThan: new FilterConditionEnum({
        name: "Is less than",
        queryTargetBuilder: (value) => ({ $lt: value })
    }),
    isLessThanOrEqual: new FilterConditionEnum({
        name: "Is less than or equal",
        queryTargetBuilder: (value) => ({ $lte: value })
    }),
    isMoreThan: new FilterConditionEnum({
        name: "Is more than",
        queryTargetBuilder: (value) => ({ $mt: value })
    }),
    isMoreThanOrEqual: new FilterConditionEnum({
        name: "Is more than or equal",
        queryTargetBuilder: (value) => ({ $mte: value })
    }),
    contains: new FilterConditionEnum({
        name: "Contains",
        queryTargetBuilder: (value) => ({ $regex: RegexUtils.sanitize(value), $options: "i" })
    }),
    doesNotContain: new FilterConditionEnum({
        name: "Does not contain",
        queryTargetBuilder: (value) => ({ $not: { $regex: RegexUtils.sanitize(value), $options: "i" } })
    }),
    beginsWith: new FilterConditionEnum({
        name: "Begins with",
        queryTargetBuilder: (value) => ({ $regex: `^${RegexUtils.sanitize(value)}`, $options: "i" })
    }),
    endsWith: new FilterConditionEnum({
        name: "Ends with",
        queryTargetBuilder: (value) => ({ $regex: `${RegexUtils.sanitize(value)}$`, $options: "i" })
    }),
};
export default FilterConditionType;
