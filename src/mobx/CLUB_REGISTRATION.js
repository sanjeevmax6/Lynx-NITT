import {action, makeObservable, observable, computed} from 'mobx';

class ClubRegistration {
  state = {
    clubName: '',
    clubDescription: '',
    clubLogo:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlR3hMw_3daUL3Uhr5Y3uJh_kMaYzyqQhhPA&usqp=CAU',
    instagramLink: '',
  };

  setClubName = val => {
    this.state.clubName = val;
  };

  get getClubName() {
    return this.state.clubName;
  }

  setClubDescription = val => {
    this.state.clubDescription = val;
  };

  get getClubDescription() {
    return this.state.clubDescription;
  }

  setInstagramLink = val => {
    this.state.instagramLink = val;
  };

  get getInstagramLink() {
    return this.state.instagramLink;
  }

  setClubLogo = val => {
    this.state.clubLogo = val;
  };

  get getClubLogo() {
    return this.state.clubLogo;
  }

  constructor() {
    makeObservable(this, {
      state: observable,

      setClubName: action,
      getClubName: computed,

      setClubDescription: action,
      getClubDescription: computed,

      setInstagramLink: action,
      getInstagramLink: computed,

      setClubLogo: action,
      getClubLogo: computed,
    });
  }
}

export const CLUB_REGISTRATION_STORE = new ClubRegistration();
