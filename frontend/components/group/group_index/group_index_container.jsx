import { connect } from "react-redux";
import GroupIndex from "./group_index";
import { fetchGroups, fetchGroup } from "../../../actions/group_actions";
import { selectGroups } from '../../../reducers/selectors';

const msp = state => {
  return {
    groups: selectGroups(state),
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
