import SearchRequest from "./SearchRequest";

import SortType from "../enums/SortType";
import FilterCategoryType from "../enums/FilterCategoryType";
import MethodType from "../enums/MethodType";

/**
 * Creates a new search request object.
 */
const createRequest = () => {
    const exampleCategory = FilterCategoryType.method;
    const exampleCondition = exampleCategory.valueType.conditions[0];
    const exampleValue = MethodType.planningPoker;

    const exampleSort = SortType.title;

    return new SearchRequest({
        filters: [
            {
                category: exampleCategory.dbField,
                condition: exampleCondition.name,
                value: exampleValue.name
            }
        ],
        minDate: new Date("2001-07-31"),
        maxDate: new Date("2001-08-01"),
        sort: {
            key: exampleSort.dbField,
            isAscending: true
        }
    });
}

/**
 * Creates and handles search request response.
 */
const makeRequest = async() => {
    const response = await createRequest().request();

    // These are the returned values.
    const {
        data,
        error,
        isSuccess,

        // This function returns the results in an array of articles.
        getArticles
    } = response;
}