const INITIAL_STATE = {
  login: {
    userLoggedIn: '',
    userToken: null,
    registerToken: null,
  },
};

const SWITCH_USER_LOGGEDIN = 'switchLogin';
const UPDATE_TOKEN = 'updateToken';
const UPDATE_REGISTER_TOKEN = 'updateRegisterToken';

export const switchUserLoggedIn = status => {
  return {type: SWITCH_USER_LOGGEDIN, userLoggedIn: status};
};

export const updateToken = query => {
  return {type: UPDATE_TOKEN, userToken: query};
};

export const updateRegisterToken = query => {
  return {type: UPDATE_REGISTER_TOKEN, registerToken: query};
};

export default LoginScreenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SWITCH_USER_LOGGEDIN:
      return {...state, userLoggedIn: action.userLoggedIn};
    case UPDATE_TOKEN:
      state.login.userToken = action.userToken;
      //console.log('Updated user token' + state.login.userToken);
      return {...state, userToken: action.userToken};
    case UPDATE_REGISTER_TOKEN:
      //state.login.registerToken = action.registerToken;
      //console.log('Updated Register token' + state.login.registerToken);
      return {...state, login: {registerToken: action.registerToken}};
    default:
      return state;
  }
};
