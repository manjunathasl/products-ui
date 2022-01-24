import * as actionTypes from "../constants/actionTypes";

export const loggedIn = () => ({
  type: actionTypes.LOGGED_IN,
});

export const loggedOut = () => ({
  type: actionTypes.LOGGED_OUT,
});
