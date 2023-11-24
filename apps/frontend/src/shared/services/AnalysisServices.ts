import { AxiosResponse } from 'axios';
import $api from 'shared/api';
import { IResult } from 'shared/models/IResult';

export default class AnalysisServices {
  static async setAnalysis(text?: string): Promise<AxiosResponse<number>> {
    return $api.post<number>('/process', { text });
  }

  static async getAnalysisResult(
    id: number
  ): Promise<AxiosResponse<IResult[]>> {
    return $api.get<IResult[]>(`/process/${id}`);
  }
}
