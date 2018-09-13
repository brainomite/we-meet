import React from 'react';
import LoginFormErrorsIndex from './login_form_error_index';

const LoginFormErrors = (props) => {
  return (
    <ul>
      {props.errors.map((error, idx) => {
        return <LoginFormErrorsIndex key={idx} error={error} />;
      })}
    </ul>
  );
};

export default LoginFormErrors;
