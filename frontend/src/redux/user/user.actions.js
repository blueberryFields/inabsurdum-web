import UserActionTypes from './user.types';

export const signInStart = (userCredentials) => ({
  type: UserActionTypes.SIGN_IN_START,
  payload: userCredentials,
});

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const signOut = () => ({
  type: UserActionTypes.SIGN_OUT,
});
