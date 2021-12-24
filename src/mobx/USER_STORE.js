import {action, makeObservable, observable, computed} from 'mobx';

class UserData {
  state = {
    userName: '',
    userType: '',
    userRollNumber: '',
    userToken: '',
    userRegToken: '',
  };

  setUserType = type => {
    this.state.userType = type;
  };

  get getUserType() {
    return this.state.userType;
  }

  setUserToken = token => {
    this.state.userToken = token;
  };

  get getUserToken() {
    return this.state.userToken;
  }

  setUserRegToken = rtoken => {
    this.state.userRegToken = rtoken;
  };

  get getUserRegToken() {
    return this.state.userRegToken;
  }

  constructor() {
    makeObservable(this, {
      state: observable,

      setUserToken: action,
      getUserToken: computed,
      setUserRegToken: action,
      getUserRegToken: computed,
    });
  }
}

export const USER_STORE = new UserData();
