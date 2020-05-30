import BaseBloc from "../local-libs/bloc/BaseBloc";
import FilterCategoryType from "../libs/enums/FilterCategoryType";
import SortType from "../libs/enums/SortType";
import Enum from "../libs/enums/Enum";
import Bindable from "../local-libs/data/Bindable";
import { FilterCategoryEnum } from "../libs/enums/FilterCategoryType";
import { SortEnum } from '../libs/enums/SortType';
import DateUtils from "../libs/DateUtils";
import { FilterJointEnum } from '../libs/enums/FilterJointType';
import FilterJointType from '../libs/enums/FilterJointType';
import Utils from "../libs/Utils";

export class SearchFilterInfo {

    key: String;
    category: Bindable<FilterCategoryEnum>;
    condition: Bindable<Enum>;
    value: Bindable<String>;

    constructor() {
        this.key = Utils.createUUID();

        const defaultCategory = FilterCategoryType.method;
        this.category = new Bindable<FilterCategoryEnum>(defaultCategory);
        this.condition = new Bindable<Enum>(defaultCategory.valueType.conditions[0]);
        this.value = new Bindable<String>("");

        this.category.subscribe((v: FilterCategoryEnum) => {
            if (v.valueType.isDropdown && v.domain !== null)
                this.value.setValue(v.domain[0].name);
            else
                this.value.setValue("");
            
            this.condition.setValue(v.valueType.conditions[0]);
        });
    }
}

export class SearchJointInfo {

    key: String;
    joint: Bindable<FilterJointEnum>;

    constructor() {
        this.key = Utils.createUUID();
        this.joint = new Bindable<FilterJointEnum>(FilterJointType.or);
    }
}

export class SearchColumnInfo {

    columns: Bindable<SortEnum[]>;
    sortingIndex: Bindable<number>;
    isAscending: Bindable<boolean>;

    constructor() {
        this.columns = new Bindable<SortEnum[]>(new Array<SortEnum>(
            SortType.result,
            SortType.publicationDate,
            SortType.title,
            SortType.author,
            SortType.methodologyType
        ));
        this.sortingIndex = new Bindable<number>(2);
        this.isAscending = new Bindable<boolean>(true);
    }

    /**
     * Changes the column to display at specified index.
     */
    setColumn(index: number, type: SortEnum) {
        const newColumns = [...this.columns.getValue()];
        if (!this.isColumnIndexValid(index))
            return;
        if (this.containsColumn(type))
            return;
        
        newColumns[index] = type;
        this.columns.setValue(newColumns);
    }

    /**
     * Sets the sorting column and whether the results should be in ascending order.
     */
    setSort(sortIndex: number, isAscending: boolean) {
        if(!this.isColumnIndexValid(sortIndex))
            return;

        this.sortingIndex.setValue(sortIndex);
        this.isAscending.setValue(isAscending);
    }

    /**
     * Returns the column type which the sorting is done for.
     */
    getSortingColumn(): SortEnum {
        return this.columns.getValue()[this.sortingIndex.getValue()];
    }

    /**
     * Returns whether the specified column type has been selected.
     */
    containsColumn(type: SortEnum) {
        const columns = this.columns.getValue();
        for (let i = 0; i < columns.length; i++) {
            if (columns[i] === type)
                return true;
        }
        return false;
    }

    /**
     * Returns whether the specified index is within the column count.
     */
    isColumnIndexValid(index: number) {
        return index >= 0 && index < this.columns.getValue().length;
    }
}

export default class SearchBloc extends BaseBloc {

    minDate: Bindable<String>;
    maxDate: Bindable<String>;
    filters: Bindable<SearchFilterInfo[]>;
    joints: Bindable<SearchJointInfo[]>;
    columnInfo: SearchColumnInfo;


    constructor() {
        super();
        this.minDate = new Bindable<String>(DateUtils.toUTC(new Date(1900, 1, 1)).toString());
        this.maxDate = new Bindable<String>(DateUtils.toUTC(new Date(new Date().getUTCFullYear(), 12, 1)).toString());
        this.filters = new Bindable<SearchFilterInfo[]>(new Array<SearchFilterInfo>());
        this.joints = new Bindable<SearchJointInfo[]>(new Array<SearchJointInfo>());
        this.columnInfo = new SearchColumnInfo();

        this.addFilter();
    }

    /**
     * Adds a new filter and a joint.
     */
    addFilter() {
        this.filters.setValue([...this.filters.getValue(), new SearchFilterInfo()]);

        if (this.filters.getValue().length > 1) {
            this.joints.setValue([...this.joints.getValue(), new SearchJointInfo()]);
        }
    }

    /**
     * Removes the specified filter.
     */
    removeFilter(filter: SearchFilterInfo) {
        if (!this.canRemoveFilter())
            return;

        const filters = [...this.filters.getValue()];
        const joints = [...this.joints.getValue()];

        const filterIndex = filters.indexOf(filter);
        if (filterIndex >= 0 && filterIndex < filters.length) {
            filters.splice(filterIndex, 1);
            joints.splice(Math.min(filterIndex, joints.length-1), 1);
            
            this.filters.setValue(filters);
            this.joints.setValue(joints);
        }
    }

    /**
     * Returns the number of filters currently registered.
     */
    getFilterCount() { return this.filters.getValue().length; }

    /**
     * Returns whether a filter can be removed.
     */
    canRemoveFilter() { return this.filters.getValue().length > 1; }

    /**
     * Removes all filters and reverts to initial state.
     */
    resetFilters() {
        this.filters.getValue().length = 0;
        this.joints.getValue().length = 0;

        this.addFilter();
        this.joints.trigger();
    }
}