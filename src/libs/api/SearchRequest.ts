import { IRequest, ApiResponse, getUrl } from "./NetworkHelper";
import axios from "axios";

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

export default class SearchRequest implements IRequest {

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
            return new ApiResponse(await axios.post(getUrl("/api/article"), body));
        }
        catch (e) {
            return new ApiResponse(e);
        }
    }
}
