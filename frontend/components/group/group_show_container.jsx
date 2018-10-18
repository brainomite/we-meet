import { connect } from "react-redux";
import { fetchGroup, joinGroup, leaveGroup } from "../../actions/group_actions";
import GroupShow from "./group_show";
import {
  selectGroup,
  selectCurrentUser,
  selectIsLoggedIn,
} from "../../reducers/selectors";
import { getCurrentUser } from "../../actions/session_actions.js";

const msp = (state, ownProps) => ({
  group: selectGroup(state, ownProps.match.params.groupId),
  currentUser: selectCurrentUser(state),
  isLoggedIn: selectIsLoggedIn(state),
});

const mdp = dispatch => ({
  fetchGroup: id => dispatch(fetchGroup(id)),
  leaveGroup: id => dispatch(leaveGroup(id)),
  joinGroup: id => dispatch(joinGroup(id)),
  getCurrentUser: userId => dispatch(getCurrentUser(userId)),
});

export default connect(
  msp,
  mdp
)(GroupShow);
