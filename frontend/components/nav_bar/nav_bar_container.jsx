import { connect } from "react-redux";
import { logout } from "../../actions/session_actions.js";
import { withRouter } from "react-router-dom";
import NavBar from "./nav_bar.jsx";

const msp = ({ entities, session }) => ({
  currentUser: entities.users[session.id]
});

const mdp = dispatch => ({
  logout: () => dispatch(logout())
});

export default withRouter(
  connect(
    msp,
    mdp
  )(NavBar)
);
