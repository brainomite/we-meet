import { connect } from "react-redux";
import { fetchGroup } from "../../actions/group_actions";
import GroupShow from "./group_show";
import { selectCurrentUser } from "../../reducers/selectors";

const DEFAULT_GROUP = {
  name: "",
  description: "",
  group_user_ids: [],
  hometown: "",
  id: null,
  member_ids: [],
};

const msp = (state, ownProps) => ({
  group: state.entities.groups[ownProps.match.params.groupId] || DEFAULT_GROUP,
  currentUser: selectCurrentUser(state),
});

const mdp = dispatch => ({
  fetchGroup: id => dispatch(fetchGroup(id)),
});

export default connect(
  msp,
  mdp
)(GroupShow);
