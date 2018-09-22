import { connect } from "react-redux";
import { fetchGroup } from "../../actions/group_actions";
import GroupShow from "./group_show";

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
  currentUser: state.entities.users[state.session.id],
});

const mdp = dispatch => ({
  fetchGroup: id => dispatch(fetchGroup(id)),
});

export default connect(
  msp,
  mdp
)(GroupShow);
