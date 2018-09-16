import React from "react";
import { Link } from "react-router-dom";
import { setAvatar } from "./../actions/session_actions";
import { connect } from "react-redux";

const handleFile = props => {
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

const AvatarForm = props => {
  const preview = props.currentUser.avatarUrl ? (
    <img src={props.currentUser.avatarUrl} />
  ) : (
    <span className="far fa-user-circle" />
  );
  return (
    <main className="avatarForm">
      <div className="avatarForm-body">
        <h1 className="avatarForm-body-header">Welcome!</h1>
        <p className="avatarForm-body-instruction">
          Add a photo so other members know who you are.
        </p>
        <div className="avatarForm-body-avatar">{preview}</div>
        <label className="avatarForm-body-button">
          Upload a photo
          <input
            className="avatarForm-body-input"
            type="file"
            onChange={handleFile(props)}
          />
        </label>
        <p className="avatarForm-body-or">Or</p>
        <Link className="avatarForm-body-skipButton" to="/">
          Skip for now
        </Link>
      </div>
    </main>
  );
};

const msp = ({ entities, session }) => ({
  currentUser: entities.users[session.id]
});

const mdp = dispatch => ({
  setAvatar: avatar => dispatch(setAvatar(avatar))
});

export default connect(
  msp,
  mdp
)(AvatarForm);
