import {action, makeObservable, observable, computed} from 'mobx';
import moment from 'moment';

class calendarStore {
  state = {
    error: false,
    errorText: '',
    loading: false,
    data: {},
    success: false,
    //Adjusting to IST
    selectedDate: moment(
      new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000),
    ).format('DD-MM-YYYY'),
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

  setSelectedDate = val => {
    this.state.selectedDate = val;
  };

  get getSelectedDate() {
    return this.state.selectedDate;
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

      setData: action,
      getData: computed,

      setSuccess: action,
      getSuccess: computed,

      setSelectedDate: action,
      getSelectedDate: computed,
    });
  }
}

export const CALENDAR_STORE = new calendarStore();
