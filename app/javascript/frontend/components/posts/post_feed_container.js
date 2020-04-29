import { connect } from 'react-redux';
import { fetchPost, fetchPosts, deletePost } from '../../actions/post_actions';
import { deleteComment } from '../../actions/comment_actions';

import PostFeed from './post_feed';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  posts: state.entities.posts
});

const mapDispatchToProps = dispatch => ({
  fetchPost: id => dispatch(fetchPost(id)),
  fetchPosts: () => dispatch(fetchPosts()),
  deletePost: id => dispatch(deletePost(id)),
  deleteComment: comment => dispatch(deleteComment(comment))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostFeed)