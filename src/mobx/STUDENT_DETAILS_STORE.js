import {action, observable, makeObservable, computed} from 'mobx';

class StudentDetailStore {
  /*
    ^^^^^ STATE VARIABLES ^^^^^
  */

  state = {
    // api call values
    rollNumber: '',
    firstName: '',
    lastName: '',
    department: '',
    dob: '',
    mobileNo: '',
    aadhar: '',
    address: '',
    profilePic: '',
    interestList: [],
    clubsFollowingList: [],
    studentId: '',

    // loading and error values
    isLoading: false,
    isError: false,
    errorText: '',
    refresh: false,
  };

  reset = () => {
    this.state.rollNumber = '';
    this.state.firstName = '';
    this.state.lastName = '';
    this.state.department = '';
    this.state.dob = '';
    this.state.mobileNo = '';
    this.state.aadhar = '';
    this.state.address = '';
    this.state.profilePic = '';
    this.state.interestList = [];
    this.state.clubsFollowingList = [];
    this.state.isLoading = false;
    this.state.isError = false;
    this.state.errorText = '';
    this.state.refresh = false;
    this.state.studentId = '';
  };
  /*
    ^^^^^ SETTERS ^^^^^
  */

  // setters for the fields individually
  setDetails = details => {
    this.state.rollNumber = details.roll_no;
    this.state.firstName = details.first_name;
    this.state.lastName = details.last_name;
    this.state.department = details.department;
    this.state.dob = details.dob;
    this.state.mobileNo = details.mobile_no;
    this.state.aadhar = details.aadhar;
    this.state.address = details.address;
    this.state.profilePic = details.profile_pic;
    this.state.studentId = details.id;
  };
  setRollNumber = rno => {
    this.state.rollNumber = rno;
  };
  setFirstName = name => {
    this.state.firstName = name;
  };
  setLastName = name => {
    this.state.lastName = name;
  };
  setDepartment = department => {
    this.state.department = department;
  };
  setDob = dob => {
    this.state.dob = dob;
  };
  setMobileNo = mobileNo => {
    this.state.mobileNo = mobileNo;
  };
  setAadhar = aadhar => {
    this.state.aadhar = aadhar;
  };
  setAddress = address => {
    this.state.address = address;
  };
  setProfilePic = pic => {
    this.state.profilePic = pic;
  };

  // list setters
  setClubs = clubs => {
    this.state.clubsFollowingList = clubs;
  };
  setInterests = interests => {
    this.state.interestList = interests;
  };

  // loading and error setters
  setErrorText = errorText => {
    this.state.errorText = errorText;
  };
  setIsError = isError => {
    this.state.isError = isError;
  };
  setIsLoading = isLoading => {
    this.state.isLoading = isLoading;
  };
  setRefresh = val => {
    this.state.refresh = val;
  };
  toggleClubSubscription = clubId => {
    this.state.clubsFollowingList.forEach(item => {
      if (item.clubId._id == clubId) item.isSubscribed = !item.isSubscribed;
    });
  };

  /*
    ^^^^^ GETTERS ^^^^^
  */

  // getters for individual field
  get getDetails() {
    return this.state;
  }
  get getFirstName() {
    return this.state.firstName;
  }
  get getLastName() {
    return this.state.lastName;
  }
  get getRollNo() {
    return this.state.rollNumber;
  }
  get getMobileNo() {
    return this.state.mobileNo;
  }
  get getDepartment() {
    return this.state.department;
  }
  get getDob() {
    return this.state.dob;
  }
  get getAadhar() {
    return this.state.aadhar;
  }
  get getAddress() {
    return this.state.address;
  }
  get getProfilePic() {
    return this.state.profilePic;
  }

  // list getters
  get getInterests() {
    return this.state.interestList;
  }
  get getClubs() {
    return this.state.clubsFollowingList;
  }

  // getters for loading and errors
  get isLoading() {
    return this.state.isLoading;
  }
  get isError() {
    return this.state.isError;
  }
  get errorText() {
    return this.state.errorText;
  }
  get getRefresh() {
    return this.state.refresh;
  }

  get getStudentId() {
    return this.state.studentId;
  }

  /*
    ^^^^^ CONSTRUCTOR ^^^^^
  */

  constructor() {
    makeObservable(this, {
      state: observable,
      reset: action,
      // all setters
      setIsError: action,
      setErrorText: action,
      setIsLoading: action,
      setDetails: action,
      setInterests: action,
      setClubs: action,
      setFirstName: action,
      setLastName: action,
      setRollNumber: action,
      setMobileNo: action,
      setDepartment: action,
      setDob: action,
      setAadhar: action,
      setAddress: action,
      setProfilePic: action,
      setRefresh: action,
      toggleClubSubscription: action,

      // all getters
      isLoading: computed,
      isError: computed,
      errorText: computed,
      getDetails: computed,
      getInterests: computed,
      getClubs: computed,
      getFirstName: computed,
      getLastName: computed,
      getRollNo: computed,
      getMobileNo: computed,
      getDepartment: computed,
      getDob: computed,
      getAadhar: computed,
      getAddress: computed,
      getProfilePic: computed,
      getRefresh: computed,
      getStudentId: computed,
    });
  }
}

export const STUDENT_DETAILS_STORE = new StudentDetailStore();
