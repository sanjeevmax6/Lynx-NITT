const INITIAL_STATE = {
  splash: {
    isLoading: null,
  },
};

const SWITCH_IS_LOADING = 'switchisLoading';

export const switchIsLoading = timeOut => {
  return {type: SWITCH_IS_LOADING, isLoading: timeOut};
};

export default SplashScreenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SWITCH_IS_LOADING:
      state.splash.isLoading = action.isLoading;
    default:
      return state;
  }
};
