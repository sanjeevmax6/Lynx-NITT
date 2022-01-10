import {action, makeObservable, observable, computed} from 'mobx';

class eventDescriptionStore {
  state = {
    error: true,
    errorText: '',
    loading: true,
    success: false,
    data: '',
    eventID: '',
    isFollowingClub: false,
    wasStudentInterested: false,
  };

  setWasStudentInterested = val => {
    this.state.wasStudentInterested = val;
  };

  get getWasStudentInterested() {
    return this.state.wasStudentInterested;
  }

  setIsFollowingClub = val => {
    this.state.isFollowingClub = val;
  };

  get getIsFollowingClub() {
    return this.state.isFollowingClub;
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

  setID = val => {
    this.state.eventID = val;
  };

  get getID() {
    return this.state.eventID;
  }

  setSuccess = val => {
    this.state.success = val;
  };

  get getSuccess() {
    return this.state.success;
  }

  setIncrementFollower() {
    this.state.data.club.followers = this.state.data.club.followers + 1;
    console.log(this.state.data.club.followers);
  }

  setDecrementFollower() {
    this.state.data.club.followers = this.state.data.club.followers - 1;
    console.log(this.state.data.club.followers);
  }

  constructor() {
    makeObservable(this, {
      state: observable,

      setIncrementFollower: action,
      setDecrementFollower: action,

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

      setID: action,
      getID: computed,

      setIsFollowingClub: action,
      getIsFollowingClub: computed,

      setWasStudentInterested: action,
      getWasStudentInterested: computed,
    });
  }
}

export const EVENT_DESCRIPTION_STORE = new eventDescriptionStore();
