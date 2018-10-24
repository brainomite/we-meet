import { connect } from "react-redux";
import { createGroup, clearGroupErrors } from "../../../actions/group_actions";
import GroupCreateForm from "./group_form";

const msp = ({ errors }) => ({
  errors: errors.group,
  title: "Start a new group",
  subtitle: "We'll help you find the right people to make it happen",
  hometownPrompt: "What's your new Group's hometown?",
  namePrompt: "What will your group's name be?",
  descriptionPrompt: "Describe who should join, and what your Group will do.",
  buttonText: "Agree & Continue",
  showStepsAndDisclaimer: true,
});

const mdp = dispatch => ({
  submitGroupAction: group => dispatch(createGroup(group)),
  clearGroupErrors: () => dispatch(clearGroupErrors()),
});

export default connect(
  msp,
  mdp
)(GroupCreateForm);
