import {action, makeObservable, observable, computed} from 'mobx';
import moment from 'moment';

class calendarStore {
  state = {
    error: false,
    errorText: '',
    loading: false,
    eventData: {},
    adminEventData: {},
    success: false,
    //Adjusting to IST
    selectedDate: moment(new Date().toLocaleString()).format('DD-MM-YYYY'),
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

  setEventData = val => {
    this.state.eventData = val;
  };

  get getEventData() {
    return this.state.eventData;
  }

  setAdminEventData = val => {
    this.state.adminEventData = val;
  };

  get getAdminEventData() {
    return this.state.adminEventData;
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

      setEventData: action,
      getEventData: computed,

      setAdminEventData: action,
      getAdminEventData: computed,

      setSuccess: action,
      getSuccess: computed,

      setSelectedDate: action,
      getSelectedDate: computed,
    });
  }
}

export const CALENDAR_STORE = new calendarStore();
