import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../../actions/post_actions';

import PostItem from './post_item';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  post: state.entities.posts[ownProps.match.params.postId]
})

const mapDispatchToProps = dispatch => ({
  fetchPost: id => dispatch(fetchPost(id)),
  deletePost: id => dispatch(deletePost(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostItem);