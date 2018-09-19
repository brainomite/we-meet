import { connect } from "react-redux";
import {
  signup,
  loginDemoUser,
  clearUserErrors
} from "../../actions/session_actions";
import SignupForm from "./signup_form.jsx";
import { withRouter } from "react-router-dom";

const msp = ({ errors }) => ({
  errors: errors.user
});

const mdp = dispatch => ({
  signup: user => dispatch(signup(user)),
  loginDemoUser: () => dispatch(loginDemoUser()),
  clearUserErrors: () => dispatch(clearUserErrors())
});

export default withRouter(
  connect(
    msp,
    mdp
  )(SignupForm)
);
