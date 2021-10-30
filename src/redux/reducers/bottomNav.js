const INITIAL_STATE = {
  bottomNavigation: {
    isTabVisible: true,
  },
};

const IS_TAB_VISIBLE = 'TabVisibility';

export const TabVisibility = visibility => {
  return {type: IS_TAB_VISIBLE, isTabVisible: visibility};
};

export default BottomNavReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IS_TAB_VISIBLE:
      state.bottomNavigation.isTabVisible = action.isTabVisible;
    default:
      return state;
  }
};
