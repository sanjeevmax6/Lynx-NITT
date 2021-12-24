import {action, makeObservable, observable, computed} from 'mobx';

class BottomNavStore {
  state = {
    tabVisibility: true,
  };

  setTabVisibility = visibility => {
    this.state.tabVisibility = visibility;
  };

  get getTabVisibility() {
    return this.state.tabVisibility;
  }

  constructor() {
    makeObservable(this, {
      state: observable,

      setTabVisibility: action,
      getTabVisibility: computed,
    });
  }
}

export const BOTTOM_NAV_STORE = new BottomNavStore();
