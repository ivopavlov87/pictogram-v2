import * as APIUtil from '../util/user_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';


const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

const receiveUsers = users => ({
  type: RECEIVE_ALL_USERS,
  users
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_USER_ERRORS,
  errors,
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
  errors: [],
});

export const fetchUser = id => dispatch => (
  APIUtil.fetchUser(id).then(user => dispatch(receiveUser(user)))
);

export const fetchUsers = () => dispatch => (
  APIUtil.fetchUsers().then(users => dispatch(receiveUsers(users)))
);

export const updateUser = user => dispatch => (
  APIUtil.editUser(user).then(user => dispatch(receiveUser(user)),
    err => dispatch(receiveErrors(err.responseJSON)))
);