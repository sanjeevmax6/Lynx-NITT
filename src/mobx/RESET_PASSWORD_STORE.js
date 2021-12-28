import {action, makeObservable, observable, computed} from 'mobx';

class RESET_DATA {
  state = {
    isStudent: true,
    username: '',
  };

  setIsStudent = val => {
    this.state.isStudent = val;
  };

  get getIsStudent() {
    return this.state.isStudent;
  }

  setUsername = val => {
    this.state.username = val;
  };

  get getUsername() {
    return this.state.username;
  }

  constructor() {
    makeObservable(this, {
      state: observable,

      setIsStudent: action,
      getIsStudent: computed,

      setUsername: action,
      getUsername: computed,
    });
  }
}

export const RESET_STORE = new RESET_DATA();
