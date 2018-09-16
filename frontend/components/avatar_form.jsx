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
    <img
      className="member-avatar avatarForm-avatar"
      src={props.currentUser.avatarUrl}
    />
  ) : (
    <span className="far fa-user-circle avatarForm-icon" />
  );
  return (
    <main className="avatarForm">
      <section className="avatarForm-body">
        <h1 className="avatarForm-body-header avatarForm-marginBottom">
          Welcome!
        </h1>
        <p className="avatarForm-body-instruction avatarForm-marginBottom">
          Add a photo so other members know who you are.
        </p>
        <div className="avatarForm-body-avatar avatarForm-marginBottom">
          {preview}
        </div>
        <label className="avatarForm-body-button confirm-button">
          Upload a photo
          <input
            className="avatarForm-body-input"
            type="file"
            onChange={handleFile(props)}
          />
        </label>
        <div className="avatarForm-body-orLine" />
        <p className="avatarForm-body-or">Or</p>
        <Link className="avatarForm-body-skipButton" to="/">
          Skip for now
        </Link>
      </section>
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
