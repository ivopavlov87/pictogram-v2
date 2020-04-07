import {
  RECEIVE_POST,
  RECEIVE_POSTS,
  REMOVE_POST
} from '../actions/post_actions';

const PostsReducer = (
  state = {},
  action
) => {
  let newState;
  switch (action.type) {
    case RECEIVE_POST:
      newState = { [action.post.id]: action.post };
      return Object.assign({}, state, newState);
    case RECEIVE_POSTS:
      return action.posts;
    case REMOVE_POST:
      newState = Object.assign({}, state);
      delete newState[action.postId];
      return newState;
    default:
      return state
  }
}

export default PostsReducer;