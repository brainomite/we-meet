import { connect } from "react-redux";
import {
  updateGroup,
  clearGroupErrors,
  fetchGroup,
} from "../../../actions/group_actions";
import { selectGroup } from "../../../reducers/selectors";
import GroupCreateForm from "./group_form";

const msp = (state, ownProps) => ({
  errors: state.errors.group,
  title: "Edit your group",
  subtitle: "",
  hometownPrompt: "Hometown:",
  namePrompt: "Name:",
  descriptionPrompt: "Description:",
  buttonText: "Save",
  showStepsAndDisclaimer: false,
  group: selectGroup(state, ownProps.match.params.groupId),
  groupId: ownProps.match.params.groupId,
});

const mdp = (dispatch, ownProps) => ({
  submitGroupAction: group =>
    dispatch(updateGroup(ownProps.match.params.groupId, group)),
  clearGroupErrors: () => dispatch(clearGroupErrors()),
  fetchGroup: () => dispatch(fetchGroup(ownProps.match.params.groupId)),
});

export default connect(
  msp,
  mdp
)(GroupCreateForm);
