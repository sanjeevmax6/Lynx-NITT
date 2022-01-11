import {action, makeObservable, observable, computed} from 'mobx';

class clubRegisterStore {
  state = {
    errorText: '',
    loading: false,
    error: false,
    success: false,
  };

  reset = () => {
    this.state.errorText = '';
    this.state.loading = false;
    this.state.error = false;
    this.state.success = false;
  };

  setErrorText = txt => {
    this.state.errorText = txt;
  };

  setSuccess = val => {
    this.state.success = val;
  };

  get getSuccess() {
    return this.state.success;
  }

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

      setSuccess: action,
      getSuccess: computed,

      reset: action,
    });
  }
}

export const CLUB_REGISTER_STORE = new clubRegisterStore();
