import { connect } from "react-redux";
import GroupIndex from "./group_index";
import { fetchGroups, fetchGroup } from "../../../actions/group_actions";

const msp = state => {
  return {
    groups: state.entities.groups,
  };
};

const mdp = dispatch => ({
  fetchGroups: () => dispatch(fetchGroups()),
  fetchGroup: id => dispatch(fetchGroup(id)),
});

export default connect(
  msp,
  mdp
)(GroupIndex);
