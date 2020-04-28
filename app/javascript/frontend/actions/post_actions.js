import * as APIUtil from '../util/post_api_util';

export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST_ERRORS = 'RECEIVE_POST_ERRORS';
export const REMOVE_POST = 'REMOVE_POST';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

const receivePost = post => ({
  type: RECEIVE_POST,
  post
});

const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

const removePost = postId => ({
  type: REMOVE_POST,
  postId
});

export const receiveErrors = errors => ({
  type: RECEIVE_POST_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
  errors: []
});

export const fetchPost = id => dispatch => (
  APIUtil.fetchPost(id).then(post => dispatch(receivePost(post)))
    .catch(err => console.log(err))
);

export const fetchPosts = () => dispatch => (
  APIUtil.fetchPosts().then(posts => dispatch(receivePosts(posts)))
    .catch(err => console.log(err))
);

export const createPost = post => dispatch => (
  APIUtil.createPost(post).then(post => dispatch(receivePost(post)),
    err => dispatch(receiveErrors(err.responseJSON)))
);

export const updatePost = post => dispatch => (
  APIUtil.updatePost(post).then(post => dispatch(receivePost(post)),
    err => dispatch(receiveErrors(err.responseJSON)))
);

export const deletePost = id => dispatch => (
  APIUtil.deletePost(id).then(post => dispatch(removePost(id)))
    .catch(err => console.log(err))
);