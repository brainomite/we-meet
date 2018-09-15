import { connect } from "react-redux";
import { signup, loginDemoUser } from "../../actions/session_actions";
import SignupForm from "./signup_form.jsx";

const msp = ({ errors }) => ({
  errors: errors.user
});

const mdp = dispatch => ({
  signup: user => dispatch(signup(user)),
  loginDemoUser: () => dispatch(loginDemoUser())
});

export default connect(
  msp,
  mdp
)(SignupForm);
