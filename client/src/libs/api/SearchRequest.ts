import { ApiResponse, getUrl } from "./NetworkHelper";
import axios from "axios";
import ArticleInfo from "../types/ArticleInfo";
import { IRequestT } from "./NetworkHelper";

interface ISearchFilter {
    category: String,
    condition: String,
    value: String
}

interface ISearchSort {
    key: String,
    order: number
}

interface ISearchRequestParam {
    filters: ISearchFilter[],
    dates: [
        Date,
        Date
    ],
    sort: ISearchSort
}

class SearchResponse extends ApiResponse {

    private _isInitialized: boolean = false;
    private _articles: ArticleInfo[] = new Array<ArticleInfo>();


    getArticles() {
        if (!this._isInitialized) {
            this._isInitialized = true;

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
                    this.params.dates[0].toISOString(),
                    this.params.dates[1].toISOString()
                ],
                sort: this.params.sort
            };
            console.log(JSON.stringify(body));
            const response = await axios.post(getUrl("/api/article"), body);
            console.log(response.data);
            return new SearchResponse(response);
        }
        catch (e) {
            return new SearchResponse(e);
        }
    }
}
