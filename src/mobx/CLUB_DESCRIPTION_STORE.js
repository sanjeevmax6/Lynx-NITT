import {action, makeObservable, observable, computed} from 'mobx';

class clubDescriptionStore {
  state = {
    error: true,
    errorText: '',
    loading: true,
    success: false,
    data: '',
    liveEvents: '',
    upcomingEvents: '',
    pastEvents: '',
    clubID: '',
    isFollowingClub: false,
  };
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

  setLiveEvents = val => {
    this.state.liveEvents = val;
  };

  get getLiveEvents() {
    return this.state.liveEvents;
  }

  setUpcomingEvents = val => {
    this.state.upcomingEvents = val;
  };

  get getUpcomingEvents() {
    return this.state.upcomingEvents;
  }

  setPastEvents = val => {
    this.state.pastEvents = val;
  };

  get getPastEvents() {
    return this.state.pastEvents;
  }

  setID = val => {
    this.state.clubID = val;
  };

  get getID() {
    return this.state.clubID;
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

      setError: action,
      getError: computed,

      setErrorText: action,
      getErrorText: computed,

      setLoading: action,
      getLoading: computed,

      setData: action,
      getData: computed,

      setLiveEvents: action,
      getLiveEvents: computed,

      setUpcomingEvents: action,
      getUpcomingEvents: computed,

      setPastEvents: action,
      getPastEvents: computed,

      setSuccess: action,
      getSuccess: computed,

      setID: action,
      getID: computed,

      setIsFollowingClub: action,
      getIsFollowingClub: computed,
    });
  }
}

export const CLUB_DESCRIPTION_STORE = new clubDescriptionStore();
