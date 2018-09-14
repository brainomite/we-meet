import { connect } from "react-redux";
import { login, signup } from "../../actions/session_actions";
import SignupForm from "./signup_form.jsx";

const msp = ({ errors }) => ({
  errors: errors.users
});

const mdp = dispatch => ({
  login: user => dispatch(login(user)),
  signup: user => dispatch(signup(user))
});

export default connect(
  msp,
  mdp
)(SignupForm);
