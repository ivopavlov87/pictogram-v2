import {
  RECEIVE_USER_ERRORS,
  RECEIVE_USER,
  CLEAR_ERRORS,
} from "../actions/user_actions";

const _nullErrors = [];

export default (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER_ERRORS:
      return action.errors;
    case RECEIVE_USER:
      return _nullErrors;
    case CLEAR_ERRORS:
      return _nullErrors;
    default:
      return state;
  }
};

// NOTE: These errors deal with user account updates, not account creation
// account creation errors are handled by session errors reducer