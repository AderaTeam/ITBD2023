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

  async setAnalysisText(text?: string) {
    this.setLoading(true);
    try {
      return await AnalysisServices.setAnalysisText(text);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async setAnalysisFile(file?: FormData) {
    this.setLoading(true);
    try {
      return await AnalysisServices.setAnalysisFile(file);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}
