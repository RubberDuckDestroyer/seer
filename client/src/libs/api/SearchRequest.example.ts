import SearchRequest from "./SearchRequest";
import SortType from "../enums/SortType";
import FilterCategoryType from "../enums/FilterCategoryType";

/**
 * Creates a new search API request to the backend server.
 */
const createRequest = () => {

    const exampleCategory = FilterCategoryType.method;
    const exampleCondition = exampleCategory.valueType.conditions[0];
    const exampleValue = exampleCategory.domain[0];

    const exampleSortKey = SortType.title;
    
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
            key: exampleSortKey.dbField,
            isAscending: true
        }
    });
}

/**
 * Retrieves results from a request.
 */
const retrieveResults = async () => {
    const response = await createRequest().request();
    if (response.isSuccess) {
        // This is an array of articles.
        return response.data;
    }
    else {
        console.log(response.error);
    }
};
