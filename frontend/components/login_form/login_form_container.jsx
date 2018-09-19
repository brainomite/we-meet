import { connect } from "react-redux";
import {
  login,
  loginDemoUser,
  clearSessionErrors
} from "../../actions/session_actions";
import LoginForm from "./login_form.jsx";

const msp = ({ errors }) => ({
  errors: errors.session
});

const mdp = dispatch => ({
  login: user => dispatch(login(user)),
  loginDemoUser: () => dispatch(loginDemoUser()),
  clearSessionErrors: () => dispatch(clearSessionErrors())
});

export default connect(
  msp,
  mdp
)(LoginForm);
