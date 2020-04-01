import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login, clearErrors } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = ({ errors }) => ({
  errors: errors.session,
  formType: 'login'
});

const mapDispatchToProps = dispatch => ({
  processForm: (user) => dispatch(login(user)),
  clearErrors: () => dispatch(clearErrors())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm))