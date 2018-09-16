import { connect } from 'react-redux';
import { setAvatar } from "../../actions/session_actions";

import AvatarForm from './avatar_form';

const msp = ({ entities, session }) => ({
  currentUser: entities.users[session.id]
});

const mdp = dispatch => ({
  setAvatar: avatar => dispatch(setAvatar(avatar))
});

export default connect(msp, mdp)(AvatarForm);
