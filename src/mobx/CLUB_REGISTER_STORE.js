import {action, makeObservable, observable, computed} from 'mobx';

class clubRegisterStore {
  state = {
    errorText: '',
    loading: true,
    error: false,
  };
  setErrorText = txt => {
    this.state.errorText = txt;
  };

  get getErrorText() {
    return this.state.errorText;
  }

  setLoading = load => {
    this.state.loading = load;
  };

  get getLoading() {
    return this.state.loading;
  }

  setError = val => {
    this.state.error = val;
  };

  get getError() {
    return this.state.error;
  }

  constructor() {
    makeObservable(this, {
      state: observable,

      setErrorText: action,
      getErrorText: computed,

      setLoading: action,
      getLoading: computed,

      setError: action,
      getError: computed,
    });
  }
}

export const CLUB_REGISTER_STORE = new clubRegisterStore();
