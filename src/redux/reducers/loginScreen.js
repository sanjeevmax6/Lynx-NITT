const INITIAL_STATE = {
  login: {
    userLoggedIn: '',
    userToken: null,
    registerToken: null,
    isStudent: null,
  },
};

const SWITCH_USER_LOGGEDIN = 'switchLogin';
const UPDATE_TOKEN = 'updateToken';
const UPDATE_REGISTER_TOKEN = 'updateRegisterToken';
const UPDATE_IS_STUDENT = 'updateIsStudent';

export const switchUserLoggedIn = status => {
  return {type: SWITCH_USER_LOGGEDIN, userLoggedIn: status};
};

export const updateToken = query => {
  return {type: UPDATE_TOKEN, userToken: query};
};

export const updateRegisterToken = query => {
  return {type: UPDATE_REGISTER_TOKEN, registerToken: query};
};

export const updateIsStudent = query => {
  return {type: UPDATE_IS_STUDENT, isStudent: query};
};

export default LoginScreenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SWITCH_USER_LOGGEDIN:
      return {
        ...state,
        login: {...state.login, userLoggedIn: action.userLoggedIn},
      };
    case UPDATE_TOKEN:
      return {...state, login: {...state.login, userToken: action.userToken}};
    case UPDATE_REGISTER_TOKEN:
      return {
        ...state,
        login: {...state.login, registerToken: action.registerToken},
      };
    case UPDATE_IS_STUDENT:
      return {...state, login: {...state.login, isStudent: action.isStudent}};
    default:
      return state;
  }
};
