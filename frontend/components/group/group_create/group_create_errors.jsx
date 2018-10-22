import React from "react";

export const GroupCreateNameError = ({ name, nameValid, nameErrorEnabled }) => {
  if (nameErrorEnabled) {
    if (!nameValid) {
      if (name.length < 5) {
        return (
          <span className="invalid-form-element">
            Try adding a bit more to your name.
          </span>
        );
      }
    }
  }
  return null;
};

export const GroupCreateHometownError = props => {
  const { hometownValid, hometownErrorEnabled } = props;
  if (hometownErrorEnabled) {
    if (!hometownValid) {
      return (
        <span className="invalid-form-element">Hometown is required.</span>
      );
    }
  }
  return null;
};

export const GroupCreateDescriptionError = props => {
  const { description, descriptionValid, descriptionErrorEnabled } = props;
  if (descriptionErrorEnabled) {
    if (!descriptionValid) {
      const msg = description.length
        ? `Please write at least ${50 - description.length} more characters.`
        : "Please write at least 50 characters.";
      return <span className="invalid-form-element"> {msg} </span>;
    }
  }
  return null;
};
