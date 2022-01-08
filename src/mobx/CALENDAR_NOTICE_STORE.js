import {action, makeObservable, observable, computed} from 'mobx';

class calendarNoticeStore {
  state = {
    //Resetting in Onpress of FAB GROUP in Calendar Screen
    error: false,
    errorText: '',
    loading: false,
    success: false,
    title: '',
    description: '',
    //start Date from next day
    startDate: new Date(new Date().getTime() + 86400000),
    //end Date from two days after
    endDate: new Date(new Date().getTime() + 2 * 86400000),
    showStartDatePicker: false,
    showEndDatePicker: false,
    multiDay: false,
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

  setSuccess = val => {
    this.state.success = val;
  };

  get getSuccess() {
    return this.state.success;
  }

  setTitle = val => {
    this.state.title = val;
  };

  get getTitle() {
    return this.state.title;
  }

  setDescription = val => {
    this.state.description = val;
  };

  get getDescription() {
    return this.state.description;
  }

  setStartDate = val => {
    this.state.startDate = val;
  };

  get getStartDate() {
    return this.state.startDate;
  }

  setEndDate = val => {
    this.state.endDate = val;
  };

  get getEndDate() {
    return this.state.endDate;
  }

  setShowStartDatePicker = val => {
    this.state.showStartDatePicker = val;
  };

  get getShowStartDatePicker() {
    return this.state.showStartDatePicker;
  }

  setShowEndDatePicker = val => {
    this.state.showEndDatePicker = val;
  };

  get getShowEndDatePicker() {
    return this.state.showEndDatePicker;
  }

  setMultiDay = val => {
    this.state.multiDay = val;
  };

  get getMultiDay() {
    return this.state.multiDay;
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

      setSuccess: action,
      getSuccess: computed,

      setTitle: action,
      getTitle: computed,

      setDescription: action,
      getDescription: computed,

      setStartDate: action,
      getStartDate: computed,

      setEndDate: action,
      getEndDate: computed,

      setShowStartDatePicker: action,
      getShowStartDatePicker: computed,

      setShowEndDatePicker: action,
      getShowEndDatePicker: computed,

      setMultiDay: action,
      getMultiDay: computed,
    });
  }
}

export const CALENDAR_NOTICE_STORE = new calendarNoticeStore();
