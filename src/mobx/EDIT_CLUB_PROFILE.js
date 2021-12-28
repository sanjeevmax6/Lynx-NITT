import {action, makeObservable, observable, computed} from 'mobx';

class ClubProfile {
  state = {
    clubImage: 'https://imagizer.imageshack.com/img922/5549/DWQolC.jpg',
    clubDescription: '',
    instagramLink: '',
    websiteLink: '',
    facebookLink: '',
    youtubeLink: '',
    linkedInLink: '',
    mediumLink: '',
  };
  setClubDescription = val => {
    this.state.clubDescription = val;
  };

  get getClubDescription() {
    return this.state.clubDescription;
  }

  setClubImage = val => {
    this.state.clubImage = val;
  };

  get getClubImage() {
    return this.state.clubImage;
  }

  setInstagramLink = val => {
    this.state.instagramLink = val;
  };

  get getInstagramLink() {
    return this.state.instagramLink;
  }

  setWebsiteLink = val => {
    this.state.websiteLink = val;
  };

  get getWebsiteLink() {
    return this.state.websiteLink;
  }

  setFacebookLink = val => {
    this.state.facebookLink = val;
  };

  get getFacebookLink() {
    return this.state.facebookLink;
  }

  setYoutubeLink = val => {
    this.state.youtubeLink = val;
  };

  get getYoutubeLink() {
    return this.state.youtubeLink;
  }

  setLinkedInLink = val => {
    this.state.linkedInLink = val;
  };

  get getLinkedInLink() {
    return this.state.linkedInLink;
  }

  setMediumLink = val => {
    this.state.mediumLink = val;
  };

  get getMediumLink() {
    return this.state.mediumLink;
  }

  constructor() {
    makeObservable(this, {
      state: observable,

      setInstagramLink: action,
      getInstagramLink: computed,

      setFacebookLink: action,
      getFacebookLink: computed,

      setMediumLink: action,
      getMediumLink: computed,

      setLinkedInLink: action,
      getLinkedInLink: computed,

      setYoutubeLink: action,
      getYoutubeLink: computed,

      setWebsiteLink: action,
      getWebsiteLink: computed,

      setClubDescription: action,
      getClubDescription: computed,

      setClubImage: action,
      getClubImage: computed,
    });
  }
}

export const EDIT_CLUB_PROFILE_STORE = new ClubProfile();
