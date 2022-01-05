import {action, makeObservable, observable, computed} from 'mobx';

class FollowUnFollow {
  state = {
    doingApiCall: false,
    status: 2,
    //0 -> failed
    //1 -> success
  };

  setDoingApiCall = val => {
    this.state.doingApiCall = val;
  };

  get getDoingApiCall() {
    return this.state.doingApiCall;
  }

  setStatus = val => {
    this.state.status = val;
  };

  get getStatus() {
    return this.state.status;
  }

  constructor() {
    makeObservable(this, {
      state: observable,

      setDoingApiCall: action,
      getDoingApiCall: computed,

      setStatus: action,
      getStatus: computed,
    });
  }
}

export const TOGGLE_FOLLOW_STORE = new FollowUnFollow();
