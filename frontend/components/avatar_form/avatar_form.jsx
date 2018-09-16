import React from "react";
import AvatarFormNoAvatar from "./avatar_form_no_avatar";
import AvatarFormWithAvatar from "./avatar_form_with_avatar";

const AvatarForm = props => {
  const preview = props.currentUser.avatarUrl ? (
    <AvatarFormWithAvatar {...props} />
  ) : (
    <AvatarFormNoAvatar {...props} />
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
        {preview}
      </section>
    </main>
  );
};

export default AvatarForm;
