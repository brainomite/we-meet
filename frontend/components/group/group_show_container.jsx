import { connect } from "react-redux";
import { fetchGroup } from "../../actions/group_actions";
import GroupShow from "./group_show";
import { selectGroup } from "../../reducers/selectors";

const msp = (state, ownProps) => ({
  group: selectGroup(state, ownProps.match.params.groupId),
});

const mdp = dispatch => ({
  fetchGroup: id => dispatch(fetchGroup(id)),
});

export default connect(
  msp,
  mdp
)(GroupShow);
