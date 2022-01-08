import {action, makeObservable, observable, computed} from 'mobx';

class EditProfileStore {
  state = {
    firstName: '',
    lastName: '',
    department: '',
    address: '',
    aadharNo: '',
    profileImg: '',
    passportImg: {},
    dob: '',
    mobile: '',
    pic: '', //for existing image
    image: {}, //if user uploads a new image

    datePicker: false,

    error: false,
    errorText: '',
    loading: false,
    success: false,
  };

  setSuccess = val => {
    this.state.success = val;
  };

  get getSuccess() {
    return this.state.success;
  }

  setImage = val => {
    this.state.image = val;
  };

  get getImage() {
    return this.state.image;
  }

  setPic = pic => {
    this.state.pic = pic;
  };

  get getPic() {
    return this.state.pic;
  }

  setAadhar = val => {
    this.state.aadharNo = val;
  };

  get getAadhar() {
    return this.state.aadharNo;
  }

  setDatePicker = val => {
    this.state.datePicker = val;
  };

  get getDatePicker() {
    return this.state.datePicker;
  }

  setMobile = val => {
    this.state.mobile = val;
  };

  get getMobile() {
    return this.state.mobile;
  }

  setDOB = val => {
    this.state.dob = val;
  };

  get getDOB() {
    return this.state.dob;
  }

  setFirstName = firstName => {
    this.state.firstName = firstName;
  };
  setLastName = lastName => {
    this.state.lastName = lastName;
  };
  setDepartment = department => {
    this.state.department = department;
  };
  setAddress = address => {
    this.state.address = address;
  };
  setProfileImg = profileImg => {
    this.state.profileImg = profileImg;
  };
  setPassportImg = passportImg => {
    this.state.passportImg = passportImg;
  };

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
    return this.state.firstName;
  }
  get getLastName() {
    return this.state.lastName;
  }
  get getDepartment() {
    return this.state.department;
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

      setDOB: action,
      getDOB: computed,

      setMobile: action,
      getMobile: computed,

      setDatePicker: action,
      getDatePicker: computed,

      setAadhar: action,
      getAadhar: computed,

      setPic: action,
      getPic: computed,

      setImage: action,
      getImage: computed,

      setSuccess: action,
      getSuccess: computed,
    });
  }
}

export const STUDENT_EDIT_PROFILE_STORE = new EditProfileStore();
