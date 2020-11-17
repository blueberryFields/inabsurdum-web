import jwt_decode from 'jwt-decode';

const getSecondsSinceEpoch = (x = new Date()) => x/1000 | 0;

export const validateJwt = (jwt) => {
  return jwt_decode(jwt).exp > getSecondsSinceEpoch();
};
