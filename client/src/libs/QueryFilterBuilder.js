import Enum from "./enums/Enum";
import FilterConditionType from "./enums/FilterConditionType";
import FilterJointType from "./enums/FilterJointType";
import DateUtils from "./DateUtils";

const QueryFilterBuilder = {

    /**
     * Builds the specified array of filter data into a form which can be used for DB query.
     */
    build(filters, joints) {
        if (filters.length === 0) {
            return {};
        }
        if (filters.length === 1) {
            return {
                [filters[0].category]: QueryFilterBuilder.parsePredicate(filters[0])
            };
        }

        const lastFilter = filters[filters.length - 1];
        let lastPredicate = {
            [lastFilter.category]: QueryFilterBuilder.parsePredicate(lastFilter)
        };
        for (let j = joints.length - 1; j >= 0; j--) {
            const curFilter = filters[j];
            const curPredicate = {
                [curFilter.category]: QueryFilterBuilder.parsePredicate(curFilter)
            };
            const joint = Enum.findByName(FilterJointType, joints[j]);
            if (joint == null || typeof (joint.evaluate) !== "function") {
                throw new Error(`An unknown joint name (${joints[j]}) was given!`);
            }

            // Joining two filters using the current joint.
            const newPredicate = {};
            joint.evaluate(newPredicate, curPredicate, lastPredicate);
            lastPredicate = newPredicate;
        }
        return lastPredicate;
  },

  /**
   * Applies filtering of articles by their submission status.
   */
  applyStatusFilter(query, status) {
    if (typeof (status) !== "string") {
      return;
    }
    query["submission.statusType"] = status;
  },

  /**
   * Applies filtering of articles by date range.
   */
  applyDateFilter(query, dates) {
    if (Array.isArray(dates) && dates.length === 2 && DateUtils.isValidDate(dates[0]) && DateUtils.isValidDate(dates[1])) {
      query["submission.bibliography.DATE"] = {
        $gte: DateUtils.toUTC(dates[0]),
        $lte: DateUtils.toUTC(dates[1])
      };
    }
  },

  /**
   * Applies sorting of articles by specified sort option.
   */
  createSortOption(sort) {
    if (sort === null ||
      sort === undefined ||
      typeof (sort) !== "object" ||
      typeof (sort.key) !== "string" ||
      typeof (sort.order) !== "number") {
      return { "submission.bibliography.TITLE": 1 };
    }
    return { [sort.key]: sort.order };
  },

  /**
   * Retuns a new object which represents a predicate for DB queries.
   */
  parsePredicate({ condition, value }) {
    const conditionType = Enum.findByName(FilterConditionType, condition);
    if (conditionType === null) {
      throw new Error(`Unknown condition type: ${condition}`);
    }

    return conditionType.getQueryTarget(value);
  }
};
export default QueryFilterBuilder;
