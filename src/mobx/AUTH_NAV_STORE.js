import {action, makeObservable, observable, computed} from 'mobx';

class AuthStore {
  state = {
    splashLoading: true,
  };

  setSplashLoading = loading => {
    this.state.splashLoading = loading;
  };

  get getSplashLoading() {
    return this.state.splashLoading;
  }

  constructor() {
    makeObservable(this, {
      state: observable,

      setSplashLoading: action,
      getSplashLoading: computed,
    });
  }
}

export const AUTH_NAV_STORE = new AuthStore();