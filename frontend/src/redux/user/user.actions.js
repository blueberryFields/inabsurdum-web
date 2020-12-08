import { UserActionTypes } from './user.types';

export const setAuthenticated = (boolean) => ({
  type: UserActionTypes.SET_AUTHENTICATED,
  payload: boolean,
});

export const signIn = (user) => ({
  type: UserActionTypes.SIGN_IN,
  payload: user,
});

export const signOut = () => ({
  type: UserActionTypes.SIGN_OUT,
});
