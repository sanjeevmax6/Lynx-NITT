const INITIAL_STATE = {
  login: {
    userLoggedIn: '',
    userToken: '',
  },
};

const SWITCH_USER_LOGGEDIN = 'switchLogin';
const UPDATE_TOKEN = 'updateToken';

export const switchUserLoggedIn = status => {
  return {type: SWITCH_USER_LOGGEDIN, userLoggedIn: status};
};

export const updateToken = query => {
  return {type: UPDATE_TOKEN, userToken: query};
};

export default LoginScreenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SWITCH_USER_LOGGEDIN:
      state.login.userLoggedIn = action.userLoggedIn;
      return state;
    case UPDATE_TOKEN:
      state.login.userToken = action.userToken;
    default:
      return state;
  }
};
