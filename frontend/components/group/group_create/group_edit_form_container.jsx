import { connect } from "react-redux";
import {
  updateGroup,
  clearGroupErrors,
  fetchGroup,
  deleteGroup,
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
  showDeleteButton: true,
});

const mdp = (dispatch, ownProps) => {
  const { groupId } = ownProps.match.params;
  return {
    submitGroupAction: group => dispatch(updateGroup(groupId, group)),
    clearGroupErrors: () => dispatch(clearGroupErrors()),
    fetchGroup: () => dispatch(fetchGroup(groupId)),
    deleteGroup: () => dispatch(deleteGroup(groupId)),
  };
};

export default connect(
  msp,
  mdp
)(GroupCreateForm);
