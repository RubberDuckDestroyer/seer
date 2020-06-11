import { BaseBloc, Bindable } from 'bindable-bloc';
import SubmitRequest from '../libs/api/SubmitRequest';

interface ISubmitParam {
  TITLE: string,
  AUTHOR: string,
  SOURCE: string,
  YEAR: number,
  type: string,

  VOLUME?: number,
  ISSUE?: number,
  PAGES?: string,
  DOI?: string,
  URL?: string
}

export default class SubmitBloc extends BaseBloc {

  isSuccess: Bindable<boolean>;
  errorMessage: Bindable<string>;


  constructor() {
    super();
    this.isSuccess = new Bindable<boolean>(true);
    this.errorMessage = new Bindable<string>("");
  }

  reset() {
    this.isSuccess.setValue(true);
    this.errorMessage.setValue("");
  }

  async submit(params: ISubmitParam): Promise<boolean> {
    const response = await new SubmitRequest(params).request();
    this.isSuccess.setValue(response.isSuccess);
    // this.errorMessage.setValue(response.error);
    return response.isSuccess;
  }
}