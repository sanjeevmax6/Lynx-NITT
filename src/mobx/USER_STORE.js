import {action, makeObservable, observable, computed} from 'mobx';

class UserData {
  state = {
    userName: '',
    userType: '',
    userRollNumber: '',
    userToken: '',
  };

  setUserToken = token => {
    this.state.userToken = token;
  };

  get getUserToken() {
    return this.state.userToken;
  }

  constructor() {
    makeObservable(this, {
      state: observable,

      setUserToken: action,
      getUserToken: computed,
    });
  }
}

export const USER_STORE = new UserData();
