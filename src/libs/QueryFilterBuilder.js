import Enum from "./enums/Enum.ts";
import FilterConditionType from "./enums/FilterConditionType.ts";

const QueryFilterBuilder = {

    buildForQuery({ condition, value }) {
        const conditionType = Enum.findByName(FilterConditionType, condition);
        if (conditionType === null) {
            throw new Error(`Unknown condition type: ${condition}`);
        }

        return conditionType.getQueryTarget(value);
    }
};
module.exports = QueryFilterBuilder;
