import {action, makeObservable, observable, computed} from 'mobx';

class UserData {
  state = {
    userName: '',
    userType: '',
    userRollNumber: '',
    userToken: '',
    userRegToken: '',

    //unique ID (Android ID)
    uniqueID: '',
  };

  setUniqueId = val => {
    this.state.uniqueID = val;
  };

  get getUniqueId() {
    return this.state.uniqueID;
  }

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

      setUniqueId: action,
      getUniqueId: computed,
    });
  }
}

export const USER_STORE = new UserData();
