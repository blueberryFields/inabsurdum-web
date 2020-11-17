import { createSelector } from 'reselect';
import { validateJwt } from './user.utils';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectIsUserAuthenticated = createSelector(
  [selectUser],
  (user) => {
    if (user.currentUser) {
      return validateJwt(user.currentUser.jwt);
    } else return false;
  }
);
