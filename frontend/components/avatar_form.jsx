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
    <main className="welcome">
      <h1>Welcome!</h1>
      <p>Add a photo so other members know who you are.</p>
      {preview}
      <label>
        Upload a photo
        <input type="file" onChange={handleFile(props)} />
      </label>
      <p>Or</p>
      <Link to="/">Skip for now</Link>
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
