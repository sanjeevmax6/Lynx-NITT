import {action, makeObservable, observable, computed} from 'mobx';

class activityStore {
  state = {
    error: true,
    errorText: '',
    loading: true,
    success: false,
    data: {},
    refreshing: false,
  };

  reset = () => {
    this.state.error = true;
    this.state.errorText = '';
    this.state.loading = true;
    this.state.success = false;
    this.state.data = {};
    this.state.refreshing = false;
  };

  setRefreshing = val => {
    this.state.refreshing = val;
  };

  get getRefreshing() {
    return this.state.refreshing;
  }

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

  setData = val => {
    this.state.data = val;
  };

  get getData() {
    return this.state.data;
  }

  setSuccess = val => {
    this.state.success = val;
  };

  get getSuccess() {
    return this.state.success;
  }

  constructor() {
    makeObservable(this, {
      state: observable,
      reset: action,

      setError: action,
      getError: computed,

      setErrorText: action,
      getErrorText: computed,

      setLoading: action,
      getLoading: computed,

      setData: action,
      getData: computed,

      setSuccess: action,
      getSuccess: computed,

      setRefreshing: action,
      getRefreshing: computed,
    });
  }
}

export const ACTIVITY_STORE = new activityStore();
