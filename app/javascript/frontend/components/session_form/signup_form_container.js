import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signup, clearErrors } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = ({ errors }) => ({
  errors: errors.session,
  formType: 'signup'
});

const mapDispatchToProps = dispatch => ({
  processForm: (user) => dispatch(signup(user)),
  clearErrors: () => dispatch(clearErrors())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm));