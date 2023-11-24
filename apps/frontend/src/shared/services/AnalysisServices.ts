import { AxiosResponse } from 'axios';
import $api from 'shared/api';
import { IResult } from 'shared/models/IResult';

export default class AnalysisServices {
  static async setAnalysis(text?: string): Promise<AxiosResponse<number>> {
    return $api.post<number>('/analysis', { text });
  }

  static async getAnalysisResult(
    id: number
  ): Promise<AxiosResponse<IResult[]>> {
    return $api.get<IResult[]>(`/analysis/${id}`);
  }
}
