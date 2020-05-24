import Enum from "./Enum";
import FilterConditionType, { FilterConditionEnum } from "./FilterConditionType";

interface ICategoryDataParam {
    conditions: FilterConditionEnum[],
    isDropdown?: boolean;
    isNumeric?: boolean;
};
export class FilterValueEnum extends Enum {

    conditions: FilterConditionEnum[];
    isDropdown: boolean;
    isNumeric: boolean;

    constructor(name: String, param: ICategoryDataParam) {
        super(name);
        this.conditions = param.conditions;
        this.isDropdown = param.isDropdown || false;
        this.isNumeric = param.isNumeric || false;
    }
}

const FilterValueType = {
    fixedSet: new FilterValueEnum("Fixed set", {
        conditions: [
            FilterConditionType.isEqualTo
        ],
        isDropdown: true
    }),
    stringInput: new FilterValueEnum("String input", {
        conditions: [
            FilterConditionType.contains,
            FilterConditionType.doesNotContain,
            FilterConditionType.beginsWith,
            FilterConditionType.endsWith
        ]
    }),
    numberInput: new FilterValueEnum("Number input", {
        conditions: [
            FilterConditionType.isLessThan,
            FilterConditionType.isLessThanOrEqual,
            FilterConditionType.isMoreThan,
            FilterConditionType.isMoreThanOrEqual
        ],
        isNumeric: true
    })
};
export default FilterValueType;
