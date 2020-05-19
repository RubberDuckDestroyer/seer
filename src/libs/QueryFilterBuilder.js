import Enum from "./enums/Enum";
import FilterConditionType from "./enums/FilterConditionType";

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
