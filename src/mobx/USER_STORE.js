import {action, makeObservable, observable, computed} from 'mobx';

class UserData {
  state = {
    userName: '',
    userType: '',
    userRollNumber: '',
    userToken: '',
    userRegToken: '',
    redirectUpdate: false,
    //unique ID (Android ID)
    uniqueID: '',

    //clubId to be used only if user type is club
    clubId: '',
  };

  reset = () => {
    this.state.userName = '';
    this.state.userType = '';
    this.state.userRollNumber = '';
    this.state.userToken = '';
    this.state.userRegToken = '';
    this.state.redirectUpdate = false;
    //unique ID (Android ID)
    this.state.uniqueID = '';

    //clubId to be used only if user type is club
    this.state.clubId = '';
  };

  setClubId = val => {
    this.state.clubId = val;
  };

  get getClubId() {
    return this.state.clubId;
  }

  setUniqueId = val => {
    this.state.uniqueID = val;
  };

  get getUniqueId() {
    return this.state.uniqueID;
  }

  setUserType = type => {
    if (this.state.userType === '') this.state.userType = type;
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

  setRedirectUpdate = val => {
    this.state.redirectUpdate = val;
  };

  get getRedirectUpdate() {
    return this.state.redirectUpdate;
  }

  constructor() {
    makeObservable(this, {
      state: observable,
      reset: action,
      setUserToken: action,
      getUserToken: computed,
      setUserRegToken: action,
      getUserRegToken: computed,

      setUniqueId: action,
      getUniqueId: computed,

      setRedirectUpdate: action,
      getRedirectUpdate: computed,

      setClubId: action,
      getClubId: computed,
    });
  }
}

export const USER_STORE = new UserData();
