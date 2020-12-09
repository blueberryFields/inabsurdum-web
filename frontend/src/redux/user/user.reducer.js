import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  // isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN:
      return {
        ...state,
        currentUser: action.payload,
        // isAuthenticated: true,
      };
    case UserActionTypes.SIGN_OUT:
      return {
        ...state,
        currentUser: null,
        // isAuthenticated: false,
      };
    // case UserActionTypes.SET_AUTHENTICATED:
    //   return {
    //     ...state,
    //     isAuthenticated: action.payload,
    //   };
    default:
      return state;
  }
};

export default userReducer;
