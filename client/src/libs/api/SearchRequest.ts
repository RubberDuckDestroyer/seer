import { ApiResponse, getUrl } from "./NetworkHelper";
import axios from "axios";
import ArticleInfo from "../types/ArticleInfo";
import { IRequestT } from "../../../client/src/libs/api/NetworkHelper";

interface ISearchFilter {
    category: String,
    condition: String,
    value: String
}

interface ISearchSort {
    key: String,
    isAscending: boolean
}

interface ISearchRequestParam {
    filters: ISearchFilter[],
    minDate: Date,
    maxDate: Date,
    sort: ISearchSort
}

class SearchResponse extends ApiResponse {

    private _articles: ArticleInfo[] | undefined;

    
    getArticles() {
        if (this._articles === undefined) {
            this._articles = new Array<ArticleInfo>();

            const data = this.data as any[];
            if (Array.isArray(data)) {
                data.forEach(d => this._articles.push(new ArticleInfo(d)));
            }
        }
        return this._articles;
    }
}

export default class SearchRequest implements IRequestT<SearchResponse> {

    params: ISearchRequestParam;


    constructor(params: ISearchRequestParam) {
        this.params = params;
    }

    async request() {
        try {
            const body = {
                filters: this.params.filters,
                dates: [
                    this.params.minDate.toISOString(),
                    this.params.maxDate.toISOString()
                ],
                sort: this.params.sort
            };
            return new SearchResponse(await axios.post(getUrl("/api/article"), body));
        }
        catch (e) {
            return new SearchResponse(e);
        }
    }
}
