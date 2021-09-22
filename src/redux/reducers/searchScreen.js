const INITIAL_STATE = {
  ui: {
    currentScreen: 'Club',
    searchQuery: '',
  },
};

//Actions
const UPDATE_SCREEN = 'updateScreen';
const UPDATE_Query = 'updateQuery';

// Action Dispatcher
export const updateScreen = screen => {
  return {type: UPDATE_SCREEN, CurrentScreen: screen};
};

export const updateQuery = Query => {
  return {type: UPDATE_Query, searchQuery: Query};
};

//Reducers

export default SearchScreenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_SCREEN:
      state.ui.currentScreen = action.CurrentScreen;
      return state;
    case UPDATE_Query:
      state.ui.searchQuery = action.searchQuery;
    default:
      return state;
  }
};
