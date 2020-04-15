import { connect } from 'react-redux';
import { fetchUser, updateUser, updateUserPicture, clearErrors } from '../../actions/user_actions';
import { deletePost } from '../../actions/post_actions';

import UserProfile from './user_profile';

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.user,
  currentUser: state.entities.users[state.session.id],
  user: state.entities.users[ownProps.match.params.userId],
})

const mapDispatchToProps = dispatch => ({
  fetchUser: (id) => dispatch(fetchUser(id)),
  updateUser: (user) => dispatch(updateUser(user)),
  updateUserPicture: (id, data) => dispatch(updateUserPicture(id, data)),
  deletePost: id => dispatch(deletePost(id)),
  clearErrors: () => dispatch(clearErrors())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile)