const Enum = require("./enums/Enum");
const SearchConditionType = require("./enums/SearchConditionType");

const QueryFilterBuilder = {

    buildForQuery({ condition, value }) {
        const conditionType = Enum.findByName(SearchConditionType, condition);
        if (conditionType === null) {
            throw new Error(`Unknown condition type: ${condition}`);
        }

        return conditionType.getQueryTarget(value);
    }
};
module.exports = QueryFilterBuilder;
