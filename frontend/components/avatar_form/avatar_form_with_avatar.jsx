import React from "react";
import { Link } from "react-router-dom";

const AvatarFormWithAvatar = props => {
  return (
    <section className="avatarForm-body-avatarAndLinks avatarForm-marginBottom">
      <div className="avatarForm-body-avatar avatarForm-marginBottom">
        <img
          className="member-avatar avatarForm-avatar"
          src={props.currentUser.avatarUrl}
          onLoad={props.closeModal}
        />
      </div>
      <label className="avatarForm-body-change avatarForm-marginBottom">
        Change
        <input
          className="avatarForm-body-input"
          type="file"
          onChange={props.handleFile(props)}
        />
      </label>
      <Link
        // eslint-disable-next-line max-len
        className="avatarForm-body-button confirm-button avatarForm-marginBottom"
        to="/"
      >
        Use this photo
      </Link>
    </section>
  );
};

export default AvatarFormWithAvatar;
