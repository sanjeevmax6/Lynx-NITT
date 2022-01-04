import {action, makeObservable, observable, computed} from 'mobx';

class Registration {
  state = {
    mobile: '',
    firstName: '',
    secondName: '',
    department: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    address: '',
    aadhar: '',
    passport: null,
    profilePic: '',
    password: '',
    confirmPassword: '',
  };

  setPicture = val => {
    this.state.profilePic = val;
  };

  get getPicture() {
    return this.state.profilePic;
  }

  setPassword = val => {
    this.state.password = val;
  };

  get getPassword() {
    return this.state.password;
  }

  setConfirmPassword = val => {
    this.state.confirmPassword = val;
  };

  get getConfirmPassword() {
    return this.state.confirmPassword;
  }

  setAddress = val => {
    this.state.address = val;
  };

  get getAddress() {
    return this.state.address;
  }

  setAadhar = val => {
    this.state.aadhar = val;
  };

  get getAadhar() {
    return this.state.aadhar;
  }

  setPassport = val => {
    this.state.passport = val;
  };

  get getPassport() {
    return this.state.passport;
  }

  setBirthDay = val => {
    this.state.birthDay = val;
  };

  get getBirthDay() {
    return this.state.birthDay;
  }

  setBirthYear = val => {
    this.state.birthYear = val;
  };

  get getBirthYear() {
    return this.state.birthYear;
  }

  setBirthMonth = val => {
    this.state.birthMonth = val;
  };

  get getBirthMonth() {
    return this.state.birthMonth;
  }

  setDepartment = val => {
    this.state.department = val;
  };

  get getDepartment() {
    return this.state.department;
  }

  setLastName = val => {
    this.state.secondName = val;
  };

  get getLastName() {
    return this.state.secondName;
  }

  setFirstName = val => {
    this.state.firstName = val;
  };

  get getFirstName() {
    return this.state.firstName;
  }

  setMobileNumber = val => {
    this.state.mobile = val;
  };

  get getMobileNumber() {
    return this.state.mobile;
  }

  constructor() {
    makeObservable(this, {
      state: observable,

      setMobileNumber: action,
      getMobileNumber: computed,

      setFirstName: action,
      getFirstName: computed,

      setLastName: action,
      getLastName: computed,

      setDepartment: action,
      getDepartment: computed,

      setPassword: action,
      getPassword: computed,

      setConfirmPassword: action,
      getConfirmPassword: computed,

      setPicture: action,
      getPicture: computed,

      setAadhar: action,
      getAadhar: computed,

      setPassport: action,
      getPassport: computed,

      setBirthDay: action,
      getBirthDay: computed,

      setBirthMonth: action,
      getBirthMonth: computed,

      setBirthYear: action,
      getBirthYear: computed,

      setAddress: action,
      getAddress: computed,
    });
  }
}

export const STUDENT_REGISTRATION_STORE = new Registration();
