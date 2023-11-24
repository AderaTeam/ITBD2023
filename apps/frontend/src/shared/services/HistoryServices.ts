import { AxiosResponse } from 'axios';
import $api from 'shared/api';
import { IResult } from 'shared/models/IResult';

export default class HistoryServices {
  static async getHistory(): Promise<AxiosResponse<IResult[]>> {
    return $api.get<IResult[]>('/process/history');
  }
}
