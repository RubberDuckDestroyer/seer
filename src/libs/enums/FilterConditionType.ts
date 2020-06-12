import RegexUtils from "../RegexUtils";
import Enum from "./Enum";

interface IFilterConditionParam {
    queryTargetBuilder?: (value: any) => any
}

export class FilterConditionEnum extends Enum {

    queryTargetBuilder: (value: any) => any = (v) => v;


    constructor(name: string, param?: IFilterConditionParam) {
        super(name);
        if (param) {
            if(param.queryTargetBuilder !== undefined)
                this.queryTargetBuilder = param.queryTargetBuilder;
        }
    }

    getQueryTarget(value: any) {
        if (typeof (this.queryTargetBuilder) === "function") {
            return this.queryTargetBuilder(value);
        }
        return value;
    }
}

const FilterConditionType = {
    isEqualTo: new FilterConditionEnum("Is equal to"),
    isLessThan: new FilterConditionEnum("Is less than", {
        queryTargetBuilder: (value) => ({ $lt: value })
    }),
    isLessThanOrEqual: new FilterConditionEnum("Is less than or equal", {
        queryTargetBuilder: (value) => ({ $lte: value })
    }),
    isMoreThan: new FilterConditionEnum("Is more than", {
        queryTargetBuilder: (value) => ({ $mt: value })
    }),
    isMoreThanOrEqual: new FilterConditionEnum("Is more than or equal", {
        queryTargetBuilder: (value) => ({ $mte: value })
    }),
    contains: new FilterConditionEnum("Contains", {
        queryTargetBuilder: (value) => ({ $regex: RegexUtils.sanitize(value), $options: "i" })
    }),
    doesNotContain: new FilterConditionEnum("Does not contain", {
        queryTargetBuilder: (value) => ({ $not: { $regex: RegexUtils.sanitize(value), $options: "i" } })
    }),
    beginsWith: new FilterConditionEnum("Begins with", {
        queryTargetBuilder: (value) => ({ $regex: `^${RegexUtils.sanitize(value)}`, $options: "i" })
    }),
    endsWith: new FilterConditionEnum("Ends with", {
        queryTargetBuilder: (value) => ({ $regex: `${RegexUtils.sanitize(value)}$`, $options: "i" })
    }),
};
export default FilterConditionType;
