import Bindable from "../local-libs/data/Bindable";
import ArticleInfo from "../libs/types/ArticleInfo";
import SearchRequest from "../libs/api/SearchRequest";
import SearchBloc from "./SearchBloc";
import DateUtils from "../libs/DateUtils";

export default class SearchResultBloc {

    searchBloc: SearchBloc;
    results: Bindable<ArticleInfo[]>;

    isSuccess: Bindable<boolean>;
    errorMessage: Bindable<String>;


    constructor(searchBloc: SearchBloc) {
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

    async requestResults() {
        this.clearResults();

        try {
            const response = await new SearchRequest({
                filters: this.searchBloc.filters.getValue().map(f => ({
                    category: f.category.getValue().dbField,
                    condition: f.condition.getValue().name,
                    value: f.value.getValue()
                })),
                minDate: DateUtils.toUTC(this.searchBloc.minDate.getValue()),
                maxDate: DateUtils.toUTC(this.searchBloc.maxDate.getValue()),
                sort: {
                    key: this.searchBloc.sort.sort.getValue().dbField,
                    isAscending: this.searchBloc.sort.isAscending.getValue()
                }
            }).request();

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