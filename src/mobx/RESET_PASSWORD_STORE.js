import {action, makeObservable, observable, computed} from 'mobx';

class RESET_DATA {
  state = {
    isStudent: true,
    username: '',
    error: true,
    errorText: '',
    password: '',
    studentToken: '',
    tokenFetched: false,
    clubsToken: '',
    clubsTokenFetched: false,
    passResetSuccess: false,
  };

  reset = () => {
    this.state.isStudent = true;
    this.state.username = '';
    this.state.error = true;
    this.state.errorText = '';
    this.state.password = '';
    this.state.studentToken = '';
    this.state.tokenFetched = false;
    this.state.clubsToken = '';
    this.state.clubsTokenFetched = false;
    this.state.passResetSuccess = false;
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

  setStudentPassword = val => {
    this.state.password = val;
  };

  get getStudentPassword() {
    return this.state.password;
  }

  setStudentToken = val => {
    this.state.studentToken = val;
  };

  get getStudentToken() {
    return this.state.studentToken;
  }

  setStudentTokenFetched = val => {
    this.state.tokenFetched = val;
  };

  get getStudentTokenFetched() {
    return this.state.tokenFetched;
  }

  setClubsToken = val => {
    this.state.clubsToken = val;
  };

  get getClubsToken() {
    return this.state.clubsToken;
  }

  setClubsTokenFetched = val => {
    this.state.clubsTokenFetched = val;
  };

  get getClubsTokenFetched() {
    return this.state.clubsTokenFetched;
  }

  setPasswordResetSuccess = val => {
    this.state.passResetSuccess = val;
  };

  get getPasswordResetSuccess() {
    return this.state.passResetSuccess;
  }

  constructor() {
    makeObservable(this, {
      state: observable,
      reset: action,

      setIsStudent: action,
      getIsStudent: computed,

      setUsername: action,
      getUsername: computed,

      setError: action,
      getError: computed,

      setErrorText: action,
      getErrorText: computed,

      setStudentPassword: action,
      getStudentPassword: computed,

      setStudentToken: action,
      getStudentToken: computed,

      setStudentTokenFetched: action,
      getStudentTokenFetched: computed,

      setClubsToken: action,
      getClubsToken: computed,

      setClubsTokenFetched: action,
      getClubsTokenFetched: computed,

      setPasswordResetSuccess: action,
      getPasswordResetSuccess: computed,
    });
  }
}

export const RESET_STORE = new RESET_DATA();
