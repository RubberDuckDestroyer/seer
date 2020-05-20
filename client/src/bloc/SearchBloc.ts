import BaseBloc from "../local-libs/bloc/BaseBloc";
import FilterCategoryType from "../libs/enums/FilterCategoryType";
import SortType from "../libs/enums/SortType";
import Enum from "../libs/enums/Enum";
import Bindable from "../local-libs/data/Bindable";
import { FilterCategoryEnum } from "../libs/enums/FilterCategoryType";
import { SortEnum } from "../libs/enums/SortType";

export class SearchFilterInfo {

    category: Bindable<FilterCategoryEnum>;
    condition: Bindable<Enum>;
    value: Bindable<String>;

    constructor() {
        const defaultCategory = FilterCategoryType.method;
        this.category = new Bindable<FilterCategoryEnum>(defaultCategory);
        this.condition = new Bindable<Enum>(defaultCategory.valueType.conditions[0]);
        this.value = new Bindable<String>("");
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
    sort: SearchSortInfo;


    constructor() {
        super();
        this.minDate = new Bindable<String>(new Date().toString());
        this.maxDate = new Bindable<String>(new Date().toString());
        this.filters = new Bindable<SearchFilterInfo[]>(new Array<SearchFilterInfo>());
        this.sort = new SearchSortInfo();

        this.addFilter();
    }

    addFilter() {
        const newInfo = new SearchFilterInfo();
        this.filters.getValue().push(newInfo);
        this.filters.trigger();
    }
}