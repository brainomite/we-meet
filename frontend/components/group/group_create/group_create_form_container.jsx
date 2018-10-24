import { connect } from "react-redux";
import { createGroup, clearGroupErrors } from "../../../actions/group_actions";
import GroupCreateForm from "./group_form";

const msp = ({ errors }) => ({
  errors: errors.group,
});

const mdp = dispatch => ({
  createGroup: group => dispatch(createGroup(group)),
  clearGroupErrors: () => dispatch(clearGroupErrors()),
});

export default connect(
  msp,
  mdp
)(GroupCreateForm);
