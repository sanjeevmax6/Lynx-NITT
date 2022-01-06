import {action, makeObservable, observable, computed} from 'mobx';

class API {
  state = {
    baseUrl: '',
  };

  setBaseUrl = val => {
    this.state.baseUrl = val;
  };

  get getBaseUrl() {
    return this.state.baseUrl;
  }

  constructor() {
    makeObservable(this, {
      state: observable,

      setBaseUrl: action,
      getBaseUrl: computed,
    });
  }
}

export const API_STORE = new API();