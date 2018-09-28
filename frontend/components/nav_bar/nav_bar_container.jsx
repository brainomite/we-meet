import { connect } from "react-redux";
import { logout, getCurrentUser } from "../../actions/session_actions.js";
import { withRouter } from "react-router-dom";
import NavBar from "./nav_bar.jsx";
import {
  selectCurrentUser,
  selectIsLoggedIn,
  selectUserGroups,
} from "../../reducers/selectors";

const msp = state => ({
  currentUser: selectCurrentUser(state),
  isLoggedIn: selectIsLoggedIn(state),
  userGroups: selectUserGroups(state),
});

const mdp = dispatch => ({
  logout: () => dispatch(logout()),
  getCurrentUser: userId => dispatch(getCurrentUser(userId)),
});

export default withRouter(
  connect(
    msp,
    mdp
  )(NavBar)
);
