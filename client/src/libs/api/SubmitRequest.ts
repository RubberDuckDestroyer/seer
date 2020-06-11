import { IRequest, ApiResponse, getUrl } from "./NetworkHelper";
import axios from 'axios';

export default class SubmitRequest implements IRequest {

  params: any;

  constructor(params: any) {
    this.params = params;
  }

  async request() {
    try {
      const body = {
        info: this.params
      };
      return new ApiResponse(await axios.post(getUrl("/api/article/submit"), body));
    }
    catch (e) {
      return new ApiResponse(e);
    }
  }
}