import React from "react";
import { Link } from "react-router-dom";

const AvatarFormNoAvatar = props => {
  return (
    <section className="avatarForm-body-avatarAndLinks avatarForm-marginBottom">
      <div className="avatarForm-body-avatar avatarForm-marginBottom">
        <span className="far fa-user-circle avatarForm-icon" />
      </div>
      <label className="avatarForm-body-button confirm-button">
        Upload a photo
        <input
          className="image-input"
          type="file"
          onChange={props.handleFile(props)}
        />
      </label>
      <div className="avatarForm-body-orLine">
        <p className="avatarForm-body-or">Or</p>
      </div>
      <Link
        className="avatarForm-body-skipButton avatarForm-marginBottom"
        to="/"
      >
        Skip for now
      </Link>
    </section>
  );
};

export default AvatarFormNoAvatar;
