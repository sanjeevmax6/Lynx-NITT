import {action, makeObservable, observable, computed} from 'mobx';

class eventCreationStore {
  state = {
    error: false,
    errorText: '',
    loading: false,
  };

  setError = val => {
    this.state.error = val;
  };

  get getError() {
    return this.state.error;
  }

  setErrorText = val => {
    this.state.errorText = val;
  };

  get getErrorText() {
    return this.state.errorText;
  }

  setLoading = val => {
    this.state.loading = val;
  };

  get getLoading() {
    return this.state.loading;
  }

  constructor() {
    makeObservable(this, {
      state: observable,

      setError: action,
      getError: computed,

      setErrorText: action,
      getErrorText: computed,

      setLoading: action,
      getLoading: computed,
    });
  }
}

export const EVENT_CREATION_STORE = new eventCreationStore();