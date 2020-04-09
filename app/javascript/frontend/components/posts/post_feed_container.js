import { connect } from 'react-redux';
import { fetchPosts, deletePost } from '../../actions/post_actions';

import PostFeed from './post_feed';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  posts: state.entities.posts
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
  deletePost: id => dispatch(deletePost(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostFeed)