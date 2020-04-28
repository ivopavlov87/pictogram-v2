import { connect } from 'react-redux';
import { createComment, updateComment, clearErrors } from '../../../actions/comment_actions';


import CommentForm from './comment_form';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  errors: state.errors.comment
})

const mapDispatchToProps = dispatch => ({
  createComment: comment => dispatch(createComment(comment)),
  clearErrors: () => dispatch(clearErrors())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm);