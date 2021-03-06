import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../../actions/post_actions';
import { deleteComment } from "../../actions/comment_actions";

import PostShow from './post_show';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  post: state.entities.posts[ownProps.match.params.postId]
})

const mapDispatchToProps = (dispatch) => ({
  fetchPost: (id) => dispatch(fetchPost(id)),
  deletePost: (id) => dispatch(deletePost(id)),
  deleteComment: (comment) => dispatch(deleteComment(comment))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostShow);