import { BaseBloc } from 'bindable-bloc';
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

  async submit(params: ISubmitParam): Promise<boolean> {
    const response = await new SubmitRequest(params).request();
    return response.isSuccess;
  }
}