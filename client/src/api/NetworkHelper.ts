import { AxiosResponse } from "axios";

const baseUrl = process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

export interface IRequestT<T extends ApiResponse> {
    request(): Promise<T>
}

export interface IRequest {
    request(): Promise<ApiResponse>
}

export class ApiResponse {

    isSuccess: boolean = false;
    data: any = null;
    error: String = "";

    constructor(response: AxiosResponse | Error) {
        if (response instanceof Error) {
            this.isSuccess = false;
            this.error = response.message;
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
