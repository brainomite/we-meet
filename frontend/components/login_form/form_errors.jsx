import React from "react";
import LoginFormErrorsIndex from "./login_form_error_index";

const LoginFormErrors = ({errors}) => {
  const errorClass = errors.length ? "login-errors" : "login-errors-hidden";
  return (
    <section className={errorClass}>
      <h1>Sorry, there was a problem.</h1>
      <ul>
        {errors.map((error, idx) => {
          return <LoginFormErrorsIndex key={idx} error={error} />;
        })}
      </ul>
    </section>
  );
};

export default LoginFormErrors;
