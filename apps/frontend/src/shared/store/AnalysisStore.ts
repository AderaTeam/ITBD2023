import { makeAutoObservable } from 'mobx';
import AnalysisServices from 'shared/services/AnalysisServices';

export default class AnalysisStore {
  curentStep = 1;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setCurentStep() {
    if (this.curentStep < 2) {
      this.curentStep = this.curentStep + 1;
    }
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
