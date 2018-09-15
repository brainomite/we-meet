import { connect } from 'react-redux';
import { login, loginDemoUser } from '../../actions/session_actions';
import LoginForm from './login_form.jsx';

const msp = ({errors}) => ({
  errors: errors.session,
});

const mdp = (dispatch) => ({
  login: (user)=>dispatch(login(user)),
  loginDemoUser: () => dispatch(loginDemoUser())
});

export default connect(msp, mdp)(LoginForm);
