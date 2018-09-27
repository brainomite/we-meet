import { connect } from "react-redux";
import { logout } from "../../actions/session_actions.js";
import { withRouter } from "react-router-dom";
import NavBar from "./nav_bar.jsx";
import {
  getCurrentUser,
  getIsLoggedIn,
  getUserGroups,
} from "../../reducers/selectors";

const msp = state => ({
  currentUser: getCurrentUser(state),
  isLoggedIn: getIsLoggedIn(state),
  userGroups: getUserGroups(state),
});

const mdp = dispatch => ({
  logout: () => dispatch(logout()),
});

export default withRouter(
  connect(
    msp,
    mdp
  )(NavBar)
);
