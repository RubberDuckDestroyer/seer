import ArticleInfo from "../libs/types/ArticleInfo";
import SearchRequest from "../libs/api/SearchRequest";
import SearchBloc from "./SearchBloc";
import DateUtils from "../libs/DateUtils";
import { ISearchRequestParam } from '../libs/api/SearchRequest';
import StatusType from '../libs/enums/StatusType';
import { BaseBloc, Bindable } from 'bindable-bloc';

export default class SearchResultBloc extends BaseBloc {

    searchBloc: SearchBloc;
    results: Bindable<ArticleInfo[]>;

    isSuccess: Bindable<boolean>;
    errorMessage: Bindable<String>;


    constructor(searchBloc: SearchBloc) {
        super();
        this.searchBloc = searchBloc;
        this.results = new Bindable<ArticleInfo[]>(new Array<ArticleInfo>());
        this.isSuccess = new Bindable<boolean>(true);
        this.errorMessage = new Bindable<String>("");
    }

    clearResults() {
        this.isSuccess.setValue(true);
        this.errorMessage.setValue("");

        this.results.getValue().length = 0;
        this.results.trigger();
    }

    getSearchParam(): ISearchRequestParam {
        return {
            filters: this.searchBloc.filters.getValue().map(f => ({
                category: f.category.getValue().dbField,
                condition: f.condition.getValue().name,
                value: f.value.getValue()
            })),
            joints: this.searchBloc.joints.getValue().map(j => j.joint.getValue().name),
            dates: this.searchBloc.filterDate.getValue() ? [
                DateUtils.toUTC(this.searchBloc.minDate.getValue()),
                DateUtils.toUTC(this.searchBloc.maxDate.getValue())
            ] : undefined,
            sort: {
                key: this.searchBloc.columnInfo.getSortingColumn().dbField,
                order: this.searchBloc.columnInfo.isAscending.getValue() ? 1 : -1
            },
            status: StatusType.complete.name
        };
    }

    async requestResults() {
        this.clearResults();

        try {
            const response = await new SearchRequest(this.getSearchParam()).request();

            this.isSuccess.setValue(response.isSuccess);
            if (!response.isSuccess) {
                this.errorMessage.setValue(response.error);
            }
            else {
                this.results.setValue(response.getArticles());
            }
        }
        catch (e) {
            this.isSuccess.setValue(false);
            this.errorMessage.setValue(String(e));
        }
    }
}