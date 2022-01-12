import {action, makeObservable, observable, computed} from 'mobx';

class FEEDBACK {
  state = {
    feedback: '',
    type: '',

    loading: false,
    errorText: '',
    error: false,
    success: false,
  };

  reset = () => {
    this.state.type = '';
    this.state.feedback = '';
    this.state.loading = false;
    this.state.errorText = '';
    this.state.error = false;
    this.state.success = false;
  };

  setType = val => {
    this.state.type = val;
  };

  get getType() {
    return this.state.type;
  }

  setFeedback = val => {
    this.state.feedback = val;
  };

  get getFeedback() {
    return this.state.feedback;
  }

  constructor() {
    makeObservable(this, {
      state: observable,

      setFeedback: action,
      getFeedback: computed,

      setType: action,
      getType: computed,

      reset: action,
    });
  }
}

export const FEEDBACK_STORE = new FEEDBACK();
