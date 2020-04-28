import * as APIUtil from '../util/comment_api_util';

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const RECEIVE_COMMENT_ERRORS = 'RECEIVE_COMMENT_ERRORS';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment
});

const removeComment = comment => ({
  type: REMOVE_COMMENT,
  comment
});

export const receiveErrors = errors => ({
  type: RECEIVE_COMMENT_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
  errors: []
});

export const createComment = comment => dispatch => (
  APIUtil.createComment(comment).then(comment => dispatch(receiveComment(comment))),
    err => dispatch(receiveErrors(err.responseJSON))
);

export const updateComment = comment => dispatch => (
  APIUtil.updateComment(comment).then(comment => dispatch(receiveComment(comment))),
    err => dispatch(recieveErrors(err.responseJSON))
);

export const deleteComment = comment => dispatch => (
  APIUtil.deleteComment(comment.id).then(() => dispatch(removeComment(comment.id)))
    .catch(err => console.log(err))
);