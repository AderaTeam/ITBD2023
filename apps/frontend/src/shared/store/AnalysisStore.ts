import { makeAutoObservable } from 'mobx';

export default class AnalysisStore {
  curentStep = 0;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setCurentStep() {
    this.curentStep = this.curentStep + 1;
  }

}
