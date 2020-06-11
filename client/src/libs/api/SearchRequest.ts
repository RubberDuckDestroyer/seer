import { ApiResponse, getUrl } from "./NetworkHelper";
import axios from "axios";
import ArticleInfo from "../types/ArticleInfo";
import { IRequestT } from "./NetworkHelper";

interface ISearchFilter {
    category: string,
    condition: string,
    value: string
}

interface ISearchSort {
    key: string,
    order: number
}

export interface ISearchRequestParam {
    filters: ISearchFilter[],
    joints: string[],
    dates?: [
        Date,
        Date
    ],
    sort: ISearchSort,
    status?: string
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
            const body: any = {
                filters: this.params.filters,
                joints: this.params.joints,
                sort: this.params.sort,
                status: this.params.status,
            };
            if (Array.isArray(this.params.dates)) {
                body.dates = this.params.dates;
            }
            return new SearchResponse(await axios.post(getUrl("/api/article"), body));
        }
        catch (e) {
            return new SearchResponse(e);
        }
    }
}
