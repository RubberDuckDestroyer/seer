import FilterCategoryType from "../libs/enums/FilterCategoryType";
import ColumnType from "../libs/enums/ColumnType";
import Enum from "../libs/enums/Enum";
import { FilterCategoryEnum } from "../libs/enums/FilterCategoryType";
import { ColumnEnum } from '../libs/enums/ColumnType';
import DateUtils from "../libs/DateUtils";
import { FilterJointEnum } from '../libs/enums/FilterJointType';
import FilterJointType from '../libs/enums/FilterJointType';
import Utils from "../libs/Utils";
import { Bindable, BaseBloc } from 'bindable-bloc';

export class SearchFilterInfo {

    key: string;
    category: Bindable<FilterCategoryEnum>;
    condition: Bindable<Enum>;
    value: Bindable<string>;

    constructor() {
        this.key = Utils.createUUID();

        const defaultCategory = FilterCategoryType.method;
        this.category = new Bindable<FilterCategoryEnum>(defaultCategory);
        this.condition = new Bindable<Enum>(defaultCategory.valueType.conditions[0]);
        this.value = new Bindable<string>("");

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

    key: string;
    joint: Bindable<FilterJointEnum>;

    constructor() {
        this.key = Utils.createUUID();
        this.joint = new Bindable<FilterJointEnum>(FilterJointType.or);
    }
}

export class SearchColumnInfo {

    columns: Bindable<ColumnEnum[]>;
    sortingIndex: Bindable<number>;
    isAscending: Bindable<boolean>;

    constructor() {
        this.columns = new Bindable<ColumnEnum[]>(new Array<ColumnEnum>(
            ColumnType.result,
            ColumnType.publicationDate,
            ColumnType.title,
            ColumnType.author,
            ColumnType.doi
        ));
        this.sortingIndex = new Bindable<number>(2);
        this.isAscending = new Bindable<boolean>(true);
    }

    /**
     * Changes the column to display at specified index.
     */
    setColumn(index: number, type: ColumnEnum) {
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
    getSortingColumn(): ColumnEnum {
        return this.columns.getValue()[this.sortingIndex.getValue()];
    }

    /**
     * Returns whether the specified column type has been selected.
     */
    containsColumn(type: ColumnEnum) {
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

    minDate: Bindable<string>;
    maxDate: Bindable<string>;
    filterDate: Bindable<boolean>;
    filters: Bindable<SearchFilterInfo[]>;
    joints: Bindable<SearchJointInfo[]>;
    columnInfo: SearchColumnInfo;


    constructor() {
        super();
        this.minDate = new Bindable<string>(DateUtils.toUTC(new Date(1900, 1, 1)).toString());
        this.maxDate = new Bindable<string>(DateUtils.toUTC(new Date()).toString());
        this.filterDate = new Bindable<boolean>(true);
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