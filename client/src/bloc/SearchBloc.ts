import BaseBloc from "../local-libs/bloc/BaseBloc";
import FilterCategoryType from "../libs/enums/FilterCategoryType";
import SortType from "../libs/enums/SortType";
import Enum from "../libs/enums/Enum";
import Bindable from "../local-libs/data/Bindable";
import { FilterCategoryEnum } from "../libs/enums/FilterCategoryType";
import { SortEnum } from "../libs/enums/SortType";
import DateUtils from "../libs/DateUtils";
import { FilterJointEnum } from '../libs/enums/FilterJointType';
import FilterJointType from '../libs/enums/FilterJointType';

export class SearchFilterInfo {

    category: Bindable<FilterCategoryEnum>;
    condition: Bindable<Enum>;
    value: Bindable<String>;

    constructor() {
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

    joint: Bindable<FilterJointEnum>;

    constructor() {
        this.joint = new Bindable<FilterJointEnum>(FilterJointType.and);
    }
}

export class SearchSortInfo {

    sort: Bindable<SortEnum>;
    isAscending: Bindable<boolean>;

    constructor() {
        this.sort = new Bindable<SortEnum>(SortType.title);
        this.isAscending = new Bindable<boolean>(true);
    }
}

export default class SearchBloc extends BaseBloc {

    minDate: Bindable<String>;
    maxDate: Bindable<String>;
    filters: Bindable<SearchFilterInfo[]>;
    joints: Bindable<SearchJointInfo[]>;
    sort: SearchSortInfo;


    constructor() {
        super();
        this.minDate = new Bindable<String>(DateUtils.toUTC(new Date(1900, 1, 1)).toString());
        this.maxDate = new Bindable<String>(DateUtils.toUTC(new Date(new Date().getUTCFullYear(), 12, 1)).toString());
        this.filters = new Bindable<SearchFilterInfo[]>(new Array<SearchFilterInfo>());
        this.joints = new Bindable<SearchJointInfo[]>(new Array<SearchJointInfo>());
        this.sort = new SearchSortInfo();

        this.addFilter();
    }

    /**
     * Adds a new filter and a joint.
     */
    addFilter() {
        this.filters.getValue().push(new SearchFilterInfo());
        this.filters.trigger();

        if (this.filters.getValue().length > 1) {
            this.joints.getValue().push(new SearchJointInfo());
            this.joints.trigger();
        }
    }

    /**
     * Removes the specified filter.
     */
    removeFilter(filter: SearchFilterInfo) {
        if (!this.canRemoveFilter())
            return;

        const filters = this.filters.getValue();
        const joints = this.joints.getValue();

        const filterIndex = filters.indexOf(filter);
        if (filterIndex >= 0 && filterIndex < filters.length) {
            filters.splice(filterIndex, 1);
            joints.splice(Math.min(filterIndex, joints.length), 1);
            
            this.filters.trigger();
            this.joints.trigger();
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