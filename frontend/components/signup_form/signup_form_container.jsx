import { connect } from "react-redux";
import { login, signup, loginDemoUser } from "../../actions/session_actions";
import SignupForm from "./signup_form.jsx";

const msp = ({ errors }) => ({
  errors: errors.user
});

const mdp = dispatch => ({
  login: user => dispatch(login(user)),
  signup: user => dispatch(signup(user)),
  loginDemoUser: () => dispatch(loginDemoUser())
});

export default connect(
  msp,
  mdp
)(SignupForm);
