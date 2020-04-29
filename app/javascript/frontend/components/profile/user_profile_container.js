import { connect } from 'react-redux';
import { fetchUser, updateUser, updateUserPicture, clearErrors } from '../../actions/user_actions';
import { fetchPost, deletePost } from '../../actions/post_actions';
import { deleteComment } from "../../actions/comment_actions";

import UserProfile from './user_profile';

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.user,
  currentUser: state.entities.users[state.session.id],
  user: state.entities.users[ownProps.match.params.userId],
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (id) => dispatch(fetchUser(id)),
  updateUser: (user) => dispatch(updateUser(user)),
  updateUserPicture: (id, data) => dispatch(updateUserPicture(id, data)),
  fetchPost: (id) => dispatch(fetchPost(id)),
  deletePost: (id) => dispatch(deletePost(id)),
  deleteComment: comment => dispatch(deleteComment(comment)),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile)