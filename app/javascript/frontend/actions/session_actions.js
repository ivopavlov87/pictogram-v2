import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

// Dispatched when the user signs in
export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

// Dispatched when user is logged out, clears session token
export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});

// Dispatched to show authentication errors on front-end
export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

// Dispatched to clear errors upon successful authentication
export const clearErrors = () => ({
  type: CLEAR_ERRORS,
  errors: []
});

// On signup, dispatch appropriate action depending on which type of response we receive from the back-end
export const signup = user => dispatch => (
  APIUtil.signup(user).then(user => (
    dispatch(receiveCurrentUser(user))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

// On login, set session token and dispatch current user. Dispatch errors on failure.
export const login = user => dispatch => (
  APIUtil.login(user).then(user => (
    dispatch(receiveCurrentUser(user))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

// logs out and redirects to splash page for login
export const logout = () => dispatch => (
  APIUtil.logout().then(user => (
    (window.location.href = "/").then(
    dispatch(logoutCurrentUser()))
  ))
);