import { connect } from 'react-redux';
import { setAvatar } from "../../actions/session_actions";
import { closeModal } from '../../actions/modal_actions';

import AvatarForm from './avatar_form';

const handleFile = (props) => {
  return event => {
    const file = event.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const formData = new FormData();
      formData.append("avatar", file);
      props.setAvatar(formData);
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  };
};

const msp = ({ entities, session }) => ({
  currentUser: entities.users[session.id]
});

const mdp = dispatch => ({
  setAvatar: avatar => dispatch(setAvatar(avatar)),
  handleFile: props => handleFile(props),
  closeModal: () => dispatch(closeModal())
});

export default connect(msp, mdp)(AvatarForm);
