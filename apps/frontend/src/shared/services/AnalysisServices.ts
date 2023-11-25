import { AxiosResponse } from 'axios';
import $api from 'shared/api';
import { IResult } from 'shared/models/IResult';
import { IType } from 'shared/models/ITypes';

export default class AnalysisServices {
  static async setAnalysisText(text?: string): Promise<AxiosResponse<number>> {
    return $api.post<number>('/process', { text });
  }

  static async setAnalysisFile(
    file?: FormData
  ): Promise<AxiosResponse<number[]>> {
    return $api.post<number[]>('/process/file', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static async getAnalysisResult(
    id: number
  ): Promise<AxiosResponse<IResult[]>> {
    return $api.get<IResult[]>(`/process/${id}`);
  }

  static async getTypesEnum(): Promise<AxiosResponse<IType>> {
    return $api.get<IType>('/data/themes');
  }

  static async getDepartamentsEnum(): Promise<
    AxiosResponse<{ value: string; label: string }[]>
  > {
    return $api.get<{ value: string; label: string }[]>('/data/departaments');
  }

  static async upadateAnalysis({
    id,
    ...data
  }: IResult): Promise<AxiosResponse> {
    return $api.post(`/process/${id}`, data);
  }
}
