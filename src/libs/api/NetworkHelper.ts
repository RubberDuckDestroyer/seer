import { AxiosResponse } from "axios";

const baseUrl = process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

export interface IRequestT<T extends ApiResponse> {
    request(): Promise<T>
}

export interface IRequest {
    request(): Promise<ApiResponse>
}

interface ApiResponseParam {
    isSuccess: boolean;
    data?: any;
    error?: String;
}

function isApiResponseParam(object: any): object is ApiResponseParam {
    return 'isSuccess' in object &&
        ('data' in object || 'error' in object);
}

export class ApiResponse {

    isSuccess: boolean = false;
    data: any = null;
    error: String = "";

    constructor(response: AxiosResponse | Error | ApiResponseParam) {
        if (response instanceof Error) {
            this.isSuccess = false;
            this.error = response.message;
        }
        else if (isApiResponseParam(response)) {
            this.isSuccess = response.isSuccess;
            this.data = response.data;
            this.error = response.error;
        }
        else {
            if (response.status !== 200) {
                this.isSuccess = false;
                this.error = response.statusText;
                return;
            }

            const data = response.data;
            this.isSuccess = data.isSuccess;
            if (this.isSuccess === true) {
                this.data = data.data;
            }
            else {
                this.error = String(data.data);
            }
        }
    }
}

/**
 * Returns the full url to the API endpoint.
 */
export function getUrl(path: String) {
    return baseUrl + path;
}
