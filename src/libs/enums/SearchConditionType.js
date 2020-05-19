const Enum = require("./Enum");
const RegexUtils = require("../RegexUtils");

class SearchConditionInfo extends Enum {

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

const SearchConditionType = {
    isEqualTo: new SearchConditionInfo({
        name: "Is equal to"
    }),
    isLessThan: new SearchConditionInfo({
        name: "Is less than",
        queryTargetBuilder: (value) => ({ $lt: value })
    }),
    isLessThanOrEqual: new SearchConditionInfo({
        name: "Is less than or equal",
        queryTargetBuilder: (value) => ({ $lte: value })
    }),
    isMoreThan: new SearchConditionInfo({
        name: "Is more than",
        queryTargetBuilder: (value) => ({ $mt: value })
    }),
    isMoreThanOrEqual: new SearchConditionInfo({
        name: "Is more than or equal",
        queryTargetBuilder: (value) => ({ $mte: value })
    }),
    contains: new SearchConditionInfo({
        name: "Contains",
        queryTargetBuilder: (value) => ({ $regex: RegexUtils.sanitize(value), $options: "i" })
    }),
    doesNotContain: new SearchConditionInfo({
        name: "Does not contain",
        queryTargetBuilder: (value) => ({ $not: { $regex: RegexUtils.sanitize(value), $options: "i" } })
    }),
    beginsWith: new SearchConditionInfo({
        name: "Begins with",
        queryTargetBuilder: (value) => ({ $regex: `^${RegexUtils.sanitize(value)}`, $options: "i" })
    }),
    endsWith: new SearchConditionInfo({
        name: "Ends with",
        queryTargetBuilder: (value) => ({ $regex: `${RegexUtils.sanitize(value)}$`, $options: "i" })
    }),

    findByName() {

    }
};
module.exports = SearchConditionType;
