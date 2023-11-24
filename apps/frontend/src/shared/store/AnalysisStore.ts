import { makeAutoObservable } from 'mobx';
import AnalysisServices from 'shared/services/AnalysisServices';

export default class AnalysisStore {
  curentStep = 0;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setCurentStep(step: number) {
    this.curentStep = step;
  }

  async setAnalysis(text?: string) {
    this.setLoading(true);
    try {
      return await AnalysisServices.setAnalysis(text);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}
