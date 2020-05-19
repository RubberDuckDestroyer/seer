import FilterCategoryType from "./FilterCategoryType";

/**
 * Returns an array of categories selectable for a search filter.
 */
const getCategories = () => Object.values(FilterCategoryType);

/**
 * Returns the name of the category as seen in the backend server for processing filter.
 */
const getFieldName = () => {
    const exampleCategory = FilterCategoryType.title;
    return exampleCategory.dbField;
};

/**
 * Returns the list of supported conditions for a category.
 */
const getConditions = () => {
    const exampleCategory = FilterCategoryType.authors;
    return exampleCategory.valueType.conditions;
};

/**
 * Returns whether a category expects a fixed set of values (dropdown).
 */
const isDropdownValue = () => {
    const exampleCategory = FilterCategoryType.authors;
    return exampleCategory.valueType.isDropdown;
};

/**
 * Returns whether a category expects a numeric input value.
 */
const isNumericInputValue = () => {
    const exampleCategory = FilterCategoryType.authors;
    const valueType = exampleCategory.valueType;
    return !valueType.isDropdown && valueType.isNumeric;
};

/**
 * Returns an array of possible values expected for a category.
 */
const getDropdownValues = () => {
    const exampleCategory = FilterCategoryType.authors;
    return exampleCategory.domain;
};