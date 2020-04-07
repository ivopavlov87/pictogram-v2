import { connect } from 'react-redux';
import { createPost, clearErrors } from '../../actions/post_actions';
import PostForm from './post_form';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  errors: state.errors.post,
})

const mapDispatchToProps = dispatch => ({
  createPost: post => dispatch(createPost(post)),
  clearErrors: () => dispatch(clearErrors())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);