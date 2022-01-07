import {action, makeObservable, observable, computed} from 'mobx';

class EditProfileStore {
  state = {
    firstName:'',
    lastName:'',
    department:'',
    address:'',
    aadharNo:'',
    profileImg:'',
    passportImg:'',

    error: false,
    errorText: '',
    loading: false,
  };

  setDetails = details => {
    this.state.first_name = first_name;
    this.state.last_name = last_name;
    this.state.department = department;
    this.state.address = address;
    this.state.profileImg = profileImg;
    this.state.passportImg = passportImg;
  }

  setFirstName = firstName => {
    this.state.firstName = firstName;
  }
  setLastName = lastName => {
    this.state.lastName = lastName;
  }
  setDepartment = department => {
    this.state.department = department;
  }
  setAddress = address => {
    this.state.address = address;
  }
  setProfileImg = profileImg => {
    this.state.profileImg = profileImg;
  }
  setPassportImg = passportImg => {
    this.state.passportImg = passportImg;
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

  get getDetails() {
    return this.state;
  }
  get getFirstName() {
    return this.state,firstName;
  }
  get getLastName() {
    return this.state.lastName;
  }
  get getDepartment() {
    return this.stat.department;
  }
  get getAddress() {
    return this.state.address;
  }
  get getProfileImg() {
    return this.state.profileImg;
  }
  get getPassportImg() {
    return this.state.passportImg;
  }

  get getLoading() {
    return this.state.loading;
  }

  constructor() {
    makeObservable(this, {
      state: observable,

      setFirstName: action,
      getFirstName: computed,

      setLastName: action,
      getLastName: computed,

      setAddress: action,
      getAddress: computed,

      setDepartment: action,
      getDepartment: computed,

      setProfileImg: action,
      getProfileImg: computed,

      setPassportImg: action,
      getPassportImg: computed,

      setError: action,
      getError: computed,

      setErrorText: action,
      getErrorText: computed,

      setLoading: action,
      getLoading: computed,
    });
  }
}

export const STUDENT_EDIT_PROFILE_STORE = new EditProfileStore();